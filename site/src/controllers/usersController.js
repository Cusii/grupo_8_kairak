const bcrypt = require('bcrypt');
const db = require('../database/models');
const { check, validationResult, body } = require('express-validator');
const fs = require('fs');
const path = require('path');
const mailer = require('../handlers/mailer');
const crypto = require('crypto');
const { Op } = require("sequelize");

module.exports = {
    login: async(req, res) => {

        try {
            res.render('login', {
                title: 'Kairak',
                texto: 'lorem*3',
                css: ''
            })
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }

    },
    processLogin: async(req, res) => {

        let errors = validationResult(req);
        const { email, password, recordar } = req.body;
        const errUser = { email };

        if (!errors.isEmpty()) {
            return res.render('login', {
                errors: errors.mapped(),
                title: 'Kairak',
                css: '',
                errUser
            })
        }

        

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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }

    },

    processRegister: async(req, res, next) => {
        let errors = validationResult(req);
        console.log(req.fileValidationError);

        const role_user = 2;
        const { first_name, last_name, email, password } = req.body
        const errUser = {
            first_name,
            last_name,
            email
        }
        
        if (!errors.isEmpty() || req.fileValidationError) {
            let auxError = errors.mapped();
            auxError.image = {
                msg: req.fileValidationError
            }
            

            return res.render('register', {
                errors: auxError,
                title: 'Kairak',
                css: 'forms',
                errUser
            })
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
                return res.render('register', {
                    error: 'El usuario ya existe',
                    title: "Kairak",
                    css: 'forms',
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
                roleId: role_user,
                createdAt: new Date()
            });

            
            const subject = 'Bienvenido a Kairak ✔';
            const url = `${req.protocol}://${req.headers.host}`;
            const fileName = 'welcome';
            await mailer.sendEmail(newUser, subject, url, fileName);

            req.session.userLogin = {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role
            }

            return res.redirect(`/users/${newUser.id}`)

        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
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
                        attributes: [
                            'id',
                            'status',
                            [db.sequelize.fn('date_format', db.sequelize.col('expired_at'), '%d-%m-%Y %H:%i'), 'expiredAt']
                        ],
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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
        
    },

    updateProfile: async (req, res, next) => {
        const { first_name, last_name } = req.body
        const imgFile = req.file;

        let errors = validationResult(req)

        if (!errors.isEmpty() || req.fileValidationError) {
            let auxError = errors.mapped();
            auxError.image = {
                msg: req.fileValidationError
            }

            return res.render('editProfile', {
                title: 'Editar perfil',
                errors: auxError,
                css: ''
            })
        }    

        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
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
                avatar: user.avatar
            }, {
                where: {
                    id: +req.params.id
                }
            });

            res.redirect(`/users/${+req.params.id}`)
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
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
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    },

    toRecoverPassword: async(req,res) => {
        res.render('recoverAccount', {
            title: 'Restablecer contraseña',
            css: ''
        });
    },

    recoverPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await db.User.findOne({
                where: {
                    email: email
                }
            });

            if (user) {
                const token = crypto.randomBytes(20).toString('hex');
                const expirationTime = Date.now() + (1000*60*60);

                let tmpReset = await db.TmpResetPass.findOne({
                    where: {
                        userId: user.id
                    }
                });

                if (tmpReset) {
                    tmpReset.token = token;
                    tmpReset.expirationDate = expirationTime;
                    tmpReset.save();
                } else {
                    await db.TmpResetPass.create({
                        userId: user.id,
                        token: token,
                        expirationDate: expirationTime
                    });
                }    

                const resetUrl = `${req.protocol}://${req.headers.host}/users/reset/${token}`;
                //console.log(resetUrl);
                              
                await mailer.sendEmail(user,
                    'Restablezca la contraseña de su cuenta',
                    resetUrl,
                    'reset-password'
                );

                res.render('message', {
                    title:'Restablecer contraseña',
                    message: 'Se ha enviado un email para restablecer la contraseña. Por favor revise su correo electrónico. ',
                    css: 'message'
                })
            } else {
                res.render('recoverAccount', {
                    title: 'Restablecer contraseña',
                    css: '',
                    error: `${email} no pertenece a un usuario registrado`
                });                
            }

        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }        
    },

    toResetPassword: async (req, res) => {
        const { token } = req.params;

        try {
            const tmp = await db.TmpResetPass.findOne({
                where: {
                    token: token,
                    expirationDate: {
                        [Op.gte]: Date.now() 
                    }
                }
            });

            if (tmp) {
                const user = await db.User.findOne({
                    where: {
                        id: tmp.userId
                    }
                });

                res.render('resetPassword', {
                    title:'Restablecer contraseña',
                    user
                })
            } else {
                res.render('recoverAccount', {
                    title:'Restablecer contraseña',
                    error: `Token no valido. Intentelo nuevamente`
                })
            }    
            
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }

        
    },

    resetPassword: async(req,res) => {
        const { newPassword } = req.body;

        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                }
            });
            user.password = bcrypt.hashSync(newPassword.trim(), 12);
            await user.save();
            
            let tmpReset = await db.TmpResetPass.findOne({
                where: {
                    userId: user.id
                }
            });
            tmpReset.expirationDate = Date.now();
            await tmpReset.save();
            
            const url = `${req.protocol}://${req.headers.host}`;
            await mailer.sendEmail(user,
                'Se ha cambiado su contraseña ✔',
                url,
                'confirm-reset-password'
            );

            res.redirect('/users/login');
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
        
    }
}