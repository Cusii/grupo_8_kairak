module.exports = {
    index: (req, res) => {
        res.render('cart', {
            title: 'Kairak',
            css: ''
        })
    }
}