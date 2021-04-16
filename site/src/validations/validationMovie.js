const { check, validationResult, body } = require('express-validator')


module.exports = [
    check('title')
    .notEmpty()
    .withMessage('Ingrese un titulo'),

    check('price')
    .notEmpty()
    .withMessage('Ingrese el precio'),

    check('length')
    .notEmpty()
    .withMessage('Ingrese la duracion'),

    check('year')
    .notEmpty()
    .withMessage('Ingrese el año de estreno'),

    check('trailerPath')
    .notEmpty()
    .withMessage('Ingrese link del trailer'),

    check('moviePath')
    .notEmpty()
    .withMessage('Ingrese link de la pelicula'),

    check('description')
    .notEmpty()
    .withMessage('Ingrese una sinopsis'),

]