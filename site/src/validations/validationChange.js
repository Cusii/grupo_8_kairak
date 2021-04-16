const { check, validationResult, body } = require('express-validator')
const db = require('../database/models');

module.exports = [

    check('currentPassword')
        .notEmpty()
        .withMessage('Ingrese contraseña'),

    check('newPassword')
        .notEmpty()
        .withMessage('Ingrese contraseña')
        .isLength({ min: 8, max: undefined })
        .withMessage('El nombre debe tener mas de 8 caracteres'),    

    body('confirmPassword')
    .custom((value,{req}) => {
        if(value != req.body.password){
            return false
        }
        return true
    })
    .withMessage("Las contraseñas no coinciden")

]