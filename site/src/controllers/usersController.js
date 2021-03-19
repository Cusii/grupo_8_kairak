const bcrypt = require('bcrypt');
const db = require('../database/models');


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
        const { email, password } = req.body
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

            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    if (user.role.id === role_admin) {
                        req.session.userLogin = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role.id
                        }
                        return res.redirect('/admin')
                    } else {
                        req.session.userLogin = {
                            id: user.id
                        }
                        return res.redirect(`/users/profile/${user.id}`)
                    }
                } else {
                    res.render('login', {
                        title: 'Kairak',
                        css: '',
                        error: 'contraseña invalida',
                        genres,
                        categories
                    })
                }
            } else {
                res.render('login', {
                    title: 'Kairak',
                    css: '',
                    error: 'mail invalido',
                    genres,
                    categories
                })
            }
        } catch (error) {
            res.render('error', { error })
        }
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
    logout: (req, res) => {
        // delete req.session.userAdmin
        req.session.destroy()
        res.redirect('/')
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