const express = require('express');
const router = express.Router(); //trae el metodo router

const productDetailController = require('../controllers/productDetailController');

router.get('/', productDetailController.index)

module.exports = router;