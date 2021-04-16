const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');

module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Ingrese su email')
    .isEmail()
    .withMessage('El email no es valido'),

    check('password')
    .notEmpty()
    .withMessage('Ingrese su contraseña'),

    body('password')
    .custom(function(value, {req}) {
        return db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then( user => {
            if(!bcrypt.compareSync(value, user.password)) {
                return Promise.reject('El email o contraseña ingresados son inválidos')
            }
        })
        .catch(error => {
            return Promise.reject('El email o contraseña ingresados son inválidos')
        })
    })
]