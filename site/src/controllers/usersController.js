const bcrypt = require('bcrypt');
const db = require('../database/models');
const { check, validationResult, body } = require('express-validator');
const fs = require('fs');
const path = require('path');


module.exports = {
    login: async(req, res) => {

        try {
            res.render('login', {
                title: 'Kairak',
                texto: 'lorem*3',
                css: ''
            })
        } catch (error) {
            res.render('error', { error })
        }

    },
    processLogin: async(req, res) => {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('login', {
                errors: errors.mapped(),
                title: 'Kairak',
                css: ''
            })
        }

        const { email, password, recordar } = req.body

        const role_admin = 1;

        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                },
                include: {
                    association: "role"
                }
            });   


            if (user) {
                if (bcrypt.compareSync(password, user.password)) {

                    if (user.role.id === role_admin) {
                        req.session.userLogin = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role.id
                        }
                        if (recordar != 'undefined') {
                            res.cookie('userLogin', req.session.userLogin, {
                                maxAge: 1000 * 60
                            })
                        }
                        return res.redirect('/admin')
                    } else {
                        req.session.userLogin = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role.id
                        }
                        if (recordar != 'undefined') {
                            res.cookie('userLogin', req.session.userLogin, {
                                maxAge: 1000 * 60
                            })
                        }
                        return res.redirect(`/users/${user.id}`)
                    }
                } else {
                    res.render('login', {
                        title: 'Kairak',
                        css: ''
                    })
                }
            } else {
                res.render('login', {
                    title: 'Kairak',
                    css: ''
                })
            }
        } catch (error) {
            res.render('error', { error })
        }
    },

    logout: (req, res) => {

        if (req.cookies.userLogin) {
            res.cookie('userLogin', '', { maxAge: -1 });
        }

        delete req.session.userLogin
            // req.session.destroy()
        res.redirect('/')
    },

    register: async(req, res) => {
        try {
            res.render('register', {
                title: 'Kairak',
                css: 'forms'
            })
        } catch (error) {
            res.render('error', { error })
        }

    },

    processRegister: async(req, res, next) => {
        let errors = validationResult(req)

        if (!errors.isEmpty()) {            

            return res.render('register', {
                errors: errors.mapped(),
                title: 'Kairak',
                css: 'forms'
            })
        }


        const role_user = 2;
        const { first_name, last_name, email, password } = req.body

        let avatarPath = req.files[0];
        if (!avatarPath) {
            avatarPath = 'avatar-default.png';
        } else {
            avatarPath = req.files[0].filename;
        }

        try {

            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            let user = await db.User.findOne({
                where: {
                    email: email
                }
            });

            if (user) {
                return res.render('register', {
                    error: 'El usuario ya existe',
                    title: "Kairak",
                    css: 'forms',
                    genres,
                    categories
                })
            }
            let passHash = bcrypt.hashSync(password.trim(), 12);

            let newUser = await db.User.create({
                firstName: first_name,
                lastName: last_name,
                email,
                password: passHash,
                avatar: avatarPath,
                roleId: role_user,
                createdAt: new Date()
            });

            req.session.userLogin = {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role
            }

            return res.redirect(`/users/${newUser.id}`)

        } catch (error) {
            res.render('error', { error })
        }
    },


    showProfile: async(req, res) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                },
                include: {
                    association: "role"
                }
            });

            res.render('profile', {
                title:  `Perfil ${user.firstName}`,
                css: 'styleFormularios',
                user
            })
        } catch (error) {
            res.render('error', { error })
        }
    },

    getRentsByUser: async(req, res) => {
        
        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                },
                include: [    
                    {
                        association: "rents",
                        where: { status: 1},
                        required: false,
                        include: [
                            {
                                association: 'movie'
                            },
                            {
                                association: 'ratingByRent',
                            }
                        ]
                    }
                ]
            });            

            res.render('rents', {
                title: 'Mis alquileres',
                css: '',
                user,
            })
        } catch (error) {
            res.render('error', { error })
        }
        
    },

    editProfile: async (req, res) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                }
            });

            res.render('editProfile',{
                title: 'Editar perfil',
                css: '',
                user,
            });
            
        } catch (error) {
            res.render('error', { error })
        }
        
    },

    updateProfile: async (req, res) => {
        const { first_name, last_name, email, password, role } = req.body
        const imgFile = req.file;

        try {
            let user = db.User.findOne({
                where: {
                    id: +req.params.id
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
                avatar: user.avatar
            }, {
                where: {
                    id: +req.params.id
                }
            });

            res.redirect(`/users/${+req.params.id}`)
        } catch (error) {
            res.render('error', { error })
        }    
    },

    changePassword: async (req,res) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                }
            });

            res.render('changePass',{
                title: 'Cambiar contraseña',
                css: '',
                user,
            });
            
        } catch (error) {
            res.render('error', { error })
        }
    },

    updatePassword: async (req,res) => {
        const { currentPassword, newPassword, confirmPassword } = req.body

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
                    
                    res.render('profile', {
                        title: `Perfil ${user.firstName}`,
                        css: 'styleFormularios',
                        user,
                        success: 'Contraseña actualizada exitosamente'
                    })
                } else {                    
                    res.render('changePass',{
                        title: 'Cambiar contraseña',
                        css: '',
                        user,
                        error: 'Contraseña actual incorrecta'
                    });
                }
            } else {                
                res.render('changePass',{
                title: 'Cambiar contraseña',
                css: '',
                user,
                error: 'La nueva contraseña y su confirmación no coinciden'
                });
            }
            
        } catch (error) {
            res.render('error', { error })
        }
    }
}