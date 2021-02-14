module.exports = {
    index: (req, res) => {
        res.render('login', {
            title: 'Kairak',
            css: 'styleFormularios'
        })
    },
    admin: (req, res) => {
        res.render('loginAdmin', {
            title: 'Kairak',
            css: 'styleFormularios'
        })
    },
    carga: (req, res) => {
        res.render('cargaProducto', {
            title: 'Kairak',
            css: 'styleFormularios'
        })
    }
}