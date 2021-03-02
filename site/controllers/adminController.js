const { getUsers, setUsers } = require('../data/users')
const fs = require('fs');

const bcrypt = require('bcrypt');

const users = getUsers();
module.exports = {
    indexAdmin: (req, res) => {
        res.render('admin/indexAdmin', {
            css: 'styleFormularios'
        })

    },
    listUser: (req, res) => {
        res.render('admin/usersList', {
            title: 'Kairak',
            users,
            css: 'styleFormularios'
        })

    },
    register: (req, res) => {
        res.render('admin/crearUser')
    },
    proccesRegister: (req, res, next) => {
        const { first_name, last_name, email, password, role, avatar } = req.body

        let avatarPath = req.files[0];

        if (!email) {
            return res.redirect('/users/registro')

        }

        let result = users.find(user => user.email === email)
        if (result) {
            return res.render('registro', {
                error: 'El usuario ya existe',
                title: "kairak",
                css: 'styleFormularios'
            })
        }

        let lastID = 1;
        users.forEach(user => {
            if (user.id > lastID) {
                lastID = user.id
            }
        });

        let passHash = bcrypt.hashSync(password.trim(), 12)

        if (!avatarPath) {
            avatarPath = 'avatar-default.png';
        } else {
            avatarPath = req.files[0].filename;
        }

        let user = {
            id: lastID + 1,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            password: passHash,
            role: "user",
            avatar: avatarPath
        }
        users.push(user);
        setUsers(users);
        res.redirect('/admin//users/list')
    },
    edittUser: (req, res) => {

        const user = users.find(auto => auto.id === +req.params.id)
        res.render('admin/userEdit', {
            user,
            css: 'styleFormularios'
        })

    },
    updateUser: (req, res) => {

        const { first_name, last_name, email, password, role, avatar } = req.body
        users.forEach(user => {
            if (user.id === +req.params.id) {
                user.id = +req.params.id;
                user.first_name = first_name;
                user.last_name = last_name;
                user.email = email;
                user.password = password;
                user.role = role;
                user.avatar = avatar
            }
        })
        setUsers(users);
        res.redirect('/admin//users/list')

    },
    deleteUser: (req, res) => {

        users.forEach(user => {
            if (user.id === +req.params.id) {
                let eliminar = users.indexOf(user);
                users.splice(eliminar, 1)
            }
        });
        setUsers(users);
        res.redirect('/admin//users/list')

    },
    loginAdmin: (req, res) => {
        res.render('login')
    },
    proccesLogin: (req, res) => {
        const { email, password } = req.body

        let result = users.find(user => user.email === email)
        if (result) {
            if (bcrypt.compareSync(password, result.password)) {
                if (result.rol == 'admin') {
                    return res.redirect('/admin/index')
                } else {
                    return res.redirect('/')
                }
            } else {
                res.render('login', {
                    title: 'Kairak',
                    css: 'styleFormularios',
                    error: 'contraseña invalida'
                })
            }
        } else {
            res.render('login', {
                title: 'Kairak',
                css: 'styleFormularios',
                error: 'mail invalido'
            })
        }
    },
}