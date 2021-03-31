const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const uploadImg = require('../middlewares/uploadUserImage');
const validationLogin = require('../validations/validationLogin')
const validationRegister = require('../validations/validationRegister')

/* GET users listing. */
router.get('/login', usersController.login);
router.post('/login', validationLogin, usersController.processLogin);
router.get('/logout', usersController.logout)
router.get('/register', usersController.register);
router.post('/register', uploadImg.any(), validationRegister, usersController.processRegister);
router.get('/profile/:id', usersController.showProfile);


module.exports = router;