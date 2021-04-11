const { getUsers, setUsers } = require('../data/users')
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const path = require('path')


module.exports = {
    index: (req, res) => {        
        const { id, firstName, lastName, role} = req.session.userLogin;
        
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }
        res.render('admin/indexAdmin', {
            css: 'styleFormularios',
            userAdmin
        })

    },
    listUser: async(req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let users = await db.User.findAll({
                include: {
                    association: "role"
                }
            });

            res.render('admin/usersList', {
                title: 'Kairak',
                users,
                css: 'styleFormularios',
                userAdmin
            })

        } catch (error) {
            res.render('error', { error });
        }
    },

    register: async(req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let roles = await db.Role.findAll();

            res.render('admin/createUser', {
                title: 'Crear nuevo usuario',
                css: 'forms',
                roles,
                userAdmin
            })
        } catch (error) {
            res.render('error', { error });
        }

    },

    proccesRegister: async(req, res, next) => {
        const { first_name, last_name, email, password, role } = req.body

        let avatarPath = req.files[0];
        if (!avatarPath) {
            avatarPath = 'avatar-default.png';
        } else {
            avatarPath = req.files[0].filename;
        }

        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            });

            if (user) {
                return res.render('admin/createUser', {
                    title: 'Crear usuario',
                    css: '',
                    error: 'El email ya pertenece a un usuario'
                })
            }

            let passHash = bcrypt.hashSync(password.trim(), 12);

            let newUser = await db.User.create({
                firstName: first_name,
                lastName: last_name,
                email,
                password: passHash,
                avatar: avatarPath,
                roleId: role,
                createdAt: new Date()
            });

            res.redirect(`/admin/users/${newUser.id}`);

        } catch (error) {
            res.render('error', { error })
        }

    },

    editUser: async(req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let roles = await db.Role.findAll();

            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                },
                include: {
                    association: "role"
                }
            });

            res.render('admin/editUser', {
                title: 'Editar usuario',
                css: '',
                user,
                roles,
                userAdmin
            })
        } catch (error) {
            res.render('error', { error })
        }
    },

    updateUser: async(req, res) => {

        const { first_name, last_name, email, password, role } = req.body
        const imgFile = req.file;

        try {
            let user = db.User.findOne({
                where: {
                    id: +req.params.id
                },
                include: {
                    association: "role"
                }
            });

            if (imgFile) {
                if (fs.existsSync(path.join('public', 'images', 'movies', user.avatar))) {
                    fs.unlinkSync(path.join('public', 'images', 'movies', user.avatar));
                }
                user.avatar = req.file.filename
            }

            await db.User.update({
                id: +req.params.id,
                firstName: first_name,
                lastName: last_name,
                email: email,
                password: password,
                roleId: role,
                avatar: user.avatar,
                createdAt: user.createdAt
            }, {
                where: {
                    id: +req.params.id
                }
            });

            res.redirect('/admin/users/list')
        } catch (error) {
            res.render('error', { error })
        }
    },

    deleteUser: async(req, res) => {

        try {
                let userToDelete = await db.User.findOne({
                where: {
                    id: +req.params.id
                }
            });

            if (fs.existsSync(path.join('public', 'images', 'movies', userToDelete.avatar))) {
                fs.unlinkSync(path.join('public', 'images', 'movies', userToDelete.avatar));
            }

            await db.User.destroy({
                where: {
                    id: +req.params.id
                }
            });

            res.redirect('/admin/users/list')
        } catch (error) {
            res.render('error', { error })
        }

    },

    changePassword: async (req,res) => {
        if (userLogin.id == +req.params.id) {
            try {
                let user = await db.User.findOne({
                    where: {
                        id: +req.params.id
                    }
                });
    
                res.render('admin/changePassword',{
                    title: 'Cambiar contraseña',
                    css: '',
                    user,
                });
                
            } catch (error) {
                res.render('error', { error })
            }
        } else {
            res.redirect('/admin/users/list')
        }
        
    },

    updatePassword: async (req,res) => {
        const { currentPassword, newPassword, confirmPassword } = req.body;        

        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                }
            });

            if (newPassword.trim() == confirmPassword.trim()) {
                if (bcrypt.compareSync(currentPassword, user.password)) {
                    let passHash = bcrypt.hashSync(newPassword.trim(), 12);

                    await db.User.update({                
                        password: passHash,                
                    }, {
                        where: {
                            id: +req.params.id
                        }
                    });
                    
                    res.render('editUser', {
                        title: 'Editar usuario',
                        css: '',
                        user,
                        success: 'Contraseña actualizada exitosamente'
                    })
                } else {                    
                    res.render('admin/changePassword',{
                        title: 'Cambiar contraseña',
                        css: '',
                        user,
                        error: 'Contraseña actual incorrecta'
                    });
                }
            } else {                
                res.render('admin/changePassword',{
                title: 'Cambiar contraseña',
                css: '',
                user,
                error: 'La nueva contraseña y su confirmación no coinciden'
                });
            }
            
        } catch (error) {
            res.render('error', { error })
        }
    },

    getUser: async (req, res) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                }
            });

            res.render('admin/userProfile',{
                title: `Perfil ${user.id}`,
                css: '',
                user,
            });
            
        } catch (error) {
            res.render('error', { error })
        }
    }
}