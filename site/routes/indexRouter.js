const express = require('express');
const router = express.Router(); //trae el metodo router

const indexController = require('../controllers/indexController')

router.get('/', indexController.index)

module.exports = router;