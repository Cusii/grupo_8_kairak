const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/registro', usersController.register);
router.get('/lista', usersController.usersList);
router.get('/perfil/:id', usersController.userPerfil);

module.exports = router;