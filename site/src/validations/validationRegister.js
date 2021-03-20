const { check, validationResult, body } = require('express-validator')


module.exports = [
    check('first_name')
    .notEmpty()
    .withMessage('El nombre no debe estar vacio'),

    check('last_name')
    .notEmpty()
    .withMessage('El apellido no debe estar vacio'),

    check('email')
    .notEmpty()
    .withMessage('El mail no debe estar vacio'),

    check('password')
    .notEmpty()
    .withMessage('La contraseña no puede estar vacio')
]