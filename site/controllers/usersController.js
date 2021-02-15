module.exports = {
    login: (req, res) => {
        res.render('login', {
            title: 'Kairak',
            css: 'styleFormularios'
        })
    },
    register: (req, res) => {
        res.render('registro', {
            title: 'Kairak',
            css: 'styleFormularios'
        })
    }
}