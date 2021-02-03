module.exports = {
    index: (req, res) => {
        res.render('login', {
            title: 'Kairak'
        })
    },
    admin: (req, res) => {
        res.render('loginAdmin', {
            title: 'Kairak'
        })
    },
    carga: (req, res) => {
        res.render('cargaProducto', {
            title: 'Kairak'
        })
    }
}