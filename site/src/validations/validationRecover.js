const { check, validationResult, body } = require('express-validator')
const db = require('../database/models');

module.exports = [
    check('email')
        .notEmpty()
        .withMessage('Ingrese un email')
        .isEmail()
        .withMessage('El email no es valido'),

    body('email')
    .custom( function(value) {
        return db.User.findOne({
            where: {
                email: value,
            }
        })
        .then( user => {
            if(user) {
                return Promise.reject('Este mail ya está registrado')
            }
        })
    })

]