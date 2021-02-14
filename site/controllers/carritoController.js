module.exports = {
    index: (req, res) => {
        res.render('carrito', {
            title: 'Kairak',
            css: 'styleFormularios'
        })
    }
}