const { check, validationResult, body } = require('express-validator')
const db = require('../database/models');

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
    .withMessage('El apellido debe tener mas de 2 caracteres'),

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
                return Promise.reject('Este email ya está registrado')
            }
        })
    }),
    

    check('password')
    .notEmpty()
    .withMessage('Ingrese contraseña')
    .isLength({ min: 8, max: undefined })
    .withMessage('La contraseña debe tener mas de 8 caracteres'),    

    body('password2')
    .custom((value,{req}) => {
        if(value != req.body.password){
            return false
        }
        return true
    })
    .withMessage("Las contraseñas no coinciden")

]