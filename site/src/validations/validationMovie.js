const { check, validationResult, body } = require('express-validator')


module.exports = [
    check('title')
    .notEmpty()
    .withMessage('Ingrese un titulo'),

    check('price')
    .notEmpty()
    .withMessage('Ingrese un precio'),

    check('length')
    .notEmpty()
    .withMessage('Indique la duracion'),

    check('year')
    .notEmpty()
    .withMessage('Indique el año de estreno'),

    check('trailerPath')
    .notEmpty()
    .withMessage('Agregue link del trailer'),

    check('moviePath')
    .notEmpty()
    .withMessage('Agregar pelicula'),

    check('description')
    .notEmpty()
    .withMessage('Agregue descripcion'),

]