const { check, validationResult, body } = require('express-validator')


module.exports = [
    check('first_name')
    .notEmpty()
    .withMessage('el mail no puede estar vacio'),

    check('last_name')
    .notEmpty()
    .withMessage('el mail no puede estar vacio'),

    check('email')
    .notEmpty()
    .withMessage('el mail no puede estar vacio'),

    check('password')
    .notEmpty()
    .withMessage('la contraseña no puede estar vacio')
]