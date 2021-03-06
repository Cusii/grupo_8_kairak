const { getUsers, sendUsers } = require('../data/users')

const users = getUsers();

module.exports = {
    login: (req, res) => {
        res.render('login', {
            title: 'Kairak',
            texto: 'lorem*3',
            css: ''
        })
    },
    register: (req, res) => {
        res.render('registro', {
            title: 'Kairak',
            css: 'formStyles'
        })
    },
    usersList: (req, res) => {
        res.render('usersList', {
            title: 'Kairak',
            users,
            css: 'styleFormularios'
        })
    },
    userPerfil: (req, res) => {
        let user = users.find(user => {
            return user.id == req.params.id
        })
        res.render('admin/userPerfil', {
            title: 'Kairak',
            css: 'styleFormularios',
            user

        })
    },

}