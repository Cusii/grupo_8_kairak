const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const uploadImg = require('../middlewares/uploadUserImage');
const validationLogin = require('../validations/validationLogin')
const validationRegister = require('../validations/validationRegister');

const userCheck = require('../middlewares/userCheck');
const passCheck = require('../middlewares/passCheck');

/* GET users listing. */
router.get('/login', usersController.login);
router.post('/login', validationLogin, usersController.processLogin);
router.get('/logout', userCheck, usersController.logout)
router.get('/register', usersController.register);
router.post('/register', uploadImg.any(), validationRegister, usersController.processRegister);
router.get('/:id', userCheck, usersController.showProfile);
router.get('/:id/edit', userCheck, usersController.editProfile);
router.put('/:id/edit', userCheck, uploadImg.single('avatar'), usersController.updateProfile);

router.get('/:id/pass', userCheck, passCheck, usersController.changePassword);
router.put('/:id/pass', userCheck, passCheck, usersController.updatePassword);

router.get('/:id/rents', userCheck, usersController.getRentsByUser);


module.exports = router;