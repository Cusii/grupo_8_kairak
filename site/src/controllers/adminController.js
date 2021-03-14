const { getUsers, setUsers } = require('../data/users')
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../database/models');


const users = getUsers();
module.exports = {
    indexAdmin: (req, res) => {
        res.render('admin/indexAdmin', {
            css: 'styleFormularios'
        })

    },
    listUser: async (req, res) => {
        try {
            let users = await db.User.findAll({
                include : {
                    association : "role"
                }
            });

            res.render('admin/usersList', {
                title: 'Kairak',
                users,
                css: 'styleFormularios'
            })

        } catch (error) {
            res.render('error', {error})
        }
        

    },

    register: (req, res) => {
        res.render('admin/createUser', {
            title: 'Crear usuario',
            css: ''
        })
    },

    proccesRegister: async (req, res, next) => {
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
                    css: ''
                })
            }

            let passHash = bcrypt.hashSync(password.trim(), 12);

            await db.User.create({
                firstName: first_name,
                lastName: last_name,
                email,
                password: passHash,
                avatar: avatarPath,
                roleId: role,
                createdAt: new Date()
            });

            res.redirect('/admin/users/list')

        } catch (error) {
            res.render('error', {error})
        }

    },

    editUser: async (req, res) => {

        try {
            let user = await db.User.findOne({
                where: {
                    id: +req.params.id
                },
                include : {
                    association : "role"
                }
            });

            res.render('admin/editUser', {
                title: 'Editar usuario',
                user,
                css: ''
            })
        } catch (error) {
            res.render('error', {error})
        }    
    },

    updateUser: async (req, res) => {

        const { first_name, last_name, email, password, role } = req.body

        try {
            let user = db.User.findOne({
                where: {
                    id: +req.params.id
                },
                include : {
                    association : "role"
                }
            });

            await db.User.update({
                id: +req.params.id,
                firstName: first_name,
                lastName: last_name,
                email: email,
                password: password,
                roleId: role,
                avatar: avatar,
                createdAt: user.createdAt
            }, {
                where: {
                    id: +req.params.id
                }
            });

            res.redirect('/admin/users/list')
        } catch (error) {
            res.render('error', {error})
        }
    },

    deleteUser: async (req, res) => {

        try {
            await db.User.destroy({
                where: {
                    id: +req.params.id
                }
            });

            res.redirect('/admin/users/list')
        } catch (error) {
            res.render('error', {error})
        }        

    }    
}