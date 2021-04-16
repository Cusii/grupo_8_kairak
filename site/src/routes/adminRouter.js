const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

const uploadImg = require('../middlewares/uploadUserImage');
const adminCheck = require('../middlewares/adminCheck');
const validationRegister = require('../validations/validationRegister');
const validationEditProfile = require('../validations/validationEditProfile');
const validationChange = require('../validations/validationChange');
const changePassCheck = require('../middlewares/changePassCheck');


router.get('/', adminCheck, adminController.index);
router.get('/users/list', adminCheck, adminController.listUser);

router.get('/users/create', adminCheck, adminController.register);
router.post('/users/create', adminCheck, uploadImg.any(), validationRegister, adminController.proccesRegister);

router.get('/users/:id', adminCheck, adminController.getUser);

router.get('/users/:id/edit', adminCheck, adminController.editUser);
router.put('/users/:id/update', adminCheck, uploadImg.single('avatar'), validationEditProfile, adminController.updateUser);

router.delete('/users/:id/delete', adminCheck, adminController.deleteUser);

router.get('/users/:id/pass', adminCheck, changePassCheck, adminController.changePassword);
router.put('/users/:id/pass', adminCheck, changePassCheck, validationChange, adminController.updatePassword);

module.exports = router;