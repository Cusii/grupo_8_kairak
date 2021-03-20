const bcrypt = require('bcrypt');
const db = require('../database/models');
const { check, validationResult, body } = require('express-validator')



//const { getUsers, sendUsers } = require('../data/users')

//const users = getUsers();

module.exports = {
    login: async(req, res) => {

        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            res.render('login', {
                title: 'Kairak',
                texto: 'lorem*3',
                css: '',
                genres,
                categories
            })
        } catch (error) {
            res.render('error', { error })
        }

    },
    processLogin: async(req, res) => {

        let errors = validationResult(req)

        const { email, password, recordar } = req.body

        const role_admin = 1;

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
                },
                include: {
                    association: "role"
                }
            });

            if (!errors.isEmpty()) {
                return res.render('login', {
                    errors: errors.mapped(),
                    title: 'Kairak',
                    css: '',
                    genres,
                    categories

                })
            }


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

                        }
                        if (recordar != 'undefined') {
                            res.cookie('userLogin', req.session.userLogin, {
                                maxAge: 1000 * 60
                            })
                        }
                        return res.redirect(`/users/profile/${user.id}`)
                    }
                } else {
                    res.render('login', {
                        title: 'Kairak',
                        css: '',
                        genres,
                        categories
                    })
                }
            } else {
                res.render('login', {
                    title: 'Kairak',
                    css: '',
                    genres,
                    categories
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
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            res.render('register', {
                title: 'Kairak',
                css: 'formStyles',
                genres,
                categories
            })
        } catch (error) {
            res.render('error', { error })
        }

    },

    processRegister: async(req, res, next) => {
        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.render('login', {
                errors: errors.mapped(),
                title: 'Kairak',
                css: '',
                genres,
                categories
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
                    css: '',
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

            res.redirect('/users/login')

        } catch (error) {
            res.render('error', { error })
        }
    },


    showProfile: async(req, res) => {
        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            let genres = await db.Genre.findAll();

            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                },
                include: {
                    association: "role"
                }
            });

            res.render('profile', {
                title: 'Kairak',
                css: 'styleFormularios',
                user,
                genres,
                categories
            })
        } catch (error) {
            res.render('error', { error })
        }
    }
}