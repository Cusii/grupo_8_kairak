const express = require('express');
const router = express.Router(); //trae el metodo router

const cartController = require('../controllers/cartController')

router.get('/', cartController.index)

module.exports = router;