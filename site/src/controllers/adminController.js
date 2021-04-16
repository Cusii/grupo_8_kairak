const { getUsers, setUsers } = require('../data/users')
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const path = require('path');
const { check, validationResult, body } = require('express-validator')


module.exports = {
    index: (req, res) => {        
        
        res.render('admin/indexAdmin', {
            css: 'styleFormularios',
        })

    },

    listUser: async(req, res) => {    

        try {
            let users = await db.User.findAll({
                include: {
                    association: "role"
                }
            });

            res.render('admin/usersList', {
                title: 'Kairak',
                users,
                css: 'styleFormularios'
            })

        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    },

    register: async(req, res) => {    

        try {
            let roles = await db.Role.findAll();

            res.render('admin/createUser', {
                title: 'Crear nuevo usuario',
                css: 'forms',
                roles,
            })
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }

    },

    proccesRegister: async(req, res, next) => {
        const { first_name, last_name, email, password, role } = req.body

        let errors = validationResult(req);
        
        if (!errors.isEmpty() || req.fileValidationError) {
            let auxError = errors.mapped();
            auxError.image = {
                msg: req.fileValidationError
            }
           
            return res.render('admin/createUser', {
                errors: auxError,
                title: 'Crear nuevo usuario',
                css: 'forms',
                roles,
            });
        }

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
                firstName: first_name.trim(),
                lastName: last_name.trim(),
                email: email.trim().toLowerCase(),
                password: passHash,
                avatar: avatarPath,
                roleId: role,
                createdAt: new Date()
            });

            res.redirect(`/admin/users/${newUser.id}`);

        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }

    },

    editUser: async(req, res) => {    

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
            })
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    },

    updateUser: async(req, res) => {
        const { first_name, last_name, email, password, role } = req.body
        const imgFile = req.file;
        let errors = validationResult(req);

        if (!errors.isEmpty() || req.fileValidationError) {
            let auxError = errors.mapped();
            auxError.image = {
                msg: req.fileValidationError
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

                return res.render('admin/editUser', {
                    title: 'Editar usuario',
                    css: '',
                    user,
                    roles,
                    errors: auxError,
                })
            } catch (error) {
                console.error(error.message);
                console.error(error.stack);
                res.render("tech-difficulties");
            }    
        }

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
                if (user.avatar != 'avatar-default.png') {
                    if (fs.existsSync(path.join('public', 'images', 'users', user.avatar))) {
                        fs.unlinkSync(path.join('public', 'images', 'users', user.avatar));
                    }
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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    },

    deleteUser: async(req, res) => {
        try {
                let userToDelete = await db.User.findOne({
                where: {
                    id: +req.params.id
                }
            });

            if (userToDelete.avatar != 'avatar-default.png') {
                if (fs.existsSync(path.join('public', 'images', 'users', userToDelete.avatar))) {
                    fs.unlinkSync(path.join('public', 'images', 'users', userToDelete.avatar));
                }    
            }

            await db.User.destroy({
                where: {
                    id: +req.params.id
                }
            });

            res.redirect('/admin/users/list')
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render('tech-difficulties');
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
                console.error(error.message);
                console.error(error.stack);
                res.render("tech-difficulties");
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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    },

    getUser: async (req, res) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                },
                include: {
                    association: "role"
                }
            });

            res.render('admin/userProfile',{
                title: `Perfil ${user.id}`,
                css: '',
                user,
            });
            
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    }
}