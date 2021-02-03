const express = require('express');
const router = express.Router(); //trae el metodo router

const carritoController = require('../controllers/carritoController')

router.get('/', carritoController.index)

module.exports = router;