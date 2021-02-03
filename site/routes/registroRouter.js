const express = require('express');
const router = express.Router(); //trae el metodo router

const registroController = require('../controllers/registroController')

router.get('/', registroController.index)

module.exports = router;