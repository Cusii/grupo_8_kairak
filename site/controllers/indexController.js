module.exports = {
    index: (req, res) => {
        res.render('index', {
            title: 'Kairak',
            css: 'index.css'
        })
    }
}