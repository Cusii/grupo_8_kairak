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
    .withMessage('El mail no es valido'),
    //poner valido y no repetido

    check('password')
    .notEmpty()
    .withMessage('Ingrese contraseña')
    .isLength({ min: 8, max: undefined })
    .withMessage('El nombre debe tener mas de 8 caracteres'),

    /*   body('email').custom(value => {

          let user = db.User.findOne({
              where: {
                  email: email
              }
          } === value());

          if (user) {
              return false
          } else {
              return true
          }

      })
      .withMessage('El mail ya esta en uso') */

]