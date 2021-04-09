const express = require('express');
const router = express.Router(); //trae el metodo router

const cartController = require('../controllers/cartController');
const userCheck = require('../middlewares/userCheck');

router.get('/', userCheck, cartController.index)

module.exports = router;