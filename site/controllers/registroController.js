module.exports = {
    index: (req, res) => {
        res.render('registro', {
            title: 'Kairak',
            css: 'styleFormularios.css'
        })
    }
}