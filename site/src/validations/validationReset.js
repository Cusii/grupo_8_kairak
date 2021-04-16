const { check, validationResult, body } = require('express-validator')
const db = require('../database/models');

module.exports = [
    check('newPassword')
        .notEmpty()
        .withMessage('Ingrese contraseña')
        .isLength({ min: 8, max: undefined })
        .withMessage('El nombre debe tener mas de 8 caracteres'),    

    body('confirmNewPassword')
    .custom((value,{req}) => {
        if(value != req.body.password){
            return false
        }
        return true
    })
    .withMessage("Las contraseñas no coinciden")

]