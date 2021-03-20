const { check, validationResult, body } = require('express-validator')


module.exports = [
    check('email')
    .notEmpty()
    .withMessage('el mail no puede estar vacio'),

    check('password')
    .notEmpty()
    .withMessage('la contraseña no puede estar vacio')
]