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

        let user = {
            id: lastID + 1,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            password: passHash,
            role: "user",
            avatar: req.files[0].filename
        }
        users.push(user);
        fs.writeFileSync('./data/users.json', JSON.stringify(users), 'utf-8')
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
        fs.writeFileSync('./data/users.json', JSON.stringify(users), 'utf-8')
        res.redirect('/admin//users/list')

    },
    deleteUser: (req, res) => {

        users.forEach(user => {
            if (user.id === +req.params.id) {
                let eliminar = users.indexOf(user);
                users.splice(eliminar, 1)
            }
        });
        fs.writeFileSync('./data/users.json', JSON.stringify(users), 'utf-8')
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
                return res.redirect('/index/admin')
            } else {
                res.render('login', {
                    title: 'Kairak',
                    css: 'styleFormularios',
                    error: 'contraseña invalido'
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