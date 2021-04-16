const { check, validationResult, body } = require('express-validator')


module.exports = [
    check('first_name')
    .notEmpty()
    .withMessage('El nombre no debe estar vacio')
    .isLength({ min: 2, max: undefined })
    .withMessage('El nombre debe tener mas de 2 caracteres'),

    check('last_name')
    .notEmpty()
    .withMessage('El apellido no debe estar vacio')
    .isLength({ min: 2, max: undefined })
    .withMessage('El apellido debe tener mas de 2 caracteres')
]