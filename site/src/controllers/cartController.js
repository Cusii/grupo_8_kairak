const db = require('../database/models')
const wa_link = process.env.WA

module.exports = {
    index: (req, res) => {

        res.render('cart', {
            title: 'Kairak',
            css: '',
            wa_link
        })
    }
}