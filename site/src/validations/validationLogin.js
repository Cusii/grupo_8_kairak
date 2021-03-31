const { check, validationResult, body } = require('express-validator')


module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Ingrese un Email')
    .isEmail()
    .withMessage('El mail no es valido'),

    check('password')
    .notEmpty()
    .withMessage('Ingrese una contraseña')
]