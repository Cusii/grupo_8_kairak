const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const uploadImg = require('../middlewares/uploadUserImage');
const validationLogin = require('../validations/validationLogin')
const validationRegister = require('../validations/validationRegister');
const validationEditProfile = require('../validations/validationEditProfile');
const validationChange = require('../validations/validationChange');
const validationReset = require('../validations/validationReset');
const validationRecover = require('../validations/validationRecover');

const userCheck = require('../middlewares/userCheck');
const changePassCheck = require('../middlewares/changePassCheck');
const resetPassCheck = require('../middlewares/resetPassCheck');

/* GET users listing. */
router.get('/login', usersController.login);
router.post('/login', validationLogin, usersController.processLogin);
router.get('/logout', userCheck, usersController.logout)
router.get('/register', usersController.register);
router.post('/register', uploadImg.any(), validationRegister, usersController.processRegister);

router.get('/recover', resetPassCheck, validationRecover, usersController.toRecoverPassword);
router.post('/recover', resetPassCheck, usersController.recoverPassword);
router.get('/reset/:token', resetPassCheck, usersController.toResetPassword);
router.put('/reset/:id', resetPassCheck, validationReset, usersController.resetPassword);

router.get('/:id', userCheck, usersController.showProfile);
router.get('/:id/edit', userCheck, usersController.editProfile);
router.put('/:id/edit', userCheck,  uploadImg.single('avatar'), validationEditProfile, usersController.updateProfile);

router.get('/:id/pass', userCheck, changePassCheck, usersController.changePassword);
router.put('/:id/pass', userCheck, changePassCheck, validationChange ,usersController.updatePassword);

router.get('/:id/rents', userCheck, usersController.getRentsByUser);


module.exports = router;