const express = require('express');
const router = express.Router(); //trae el metodo router

const loginController = require('../controllers/loginController')

router.get('/', loginController.index)
router.get('/admin', loginController.admin)
router.get('/admin/carga', loginController.carga)

module.exports = router;