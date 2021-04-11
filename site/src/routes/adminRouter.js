const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

const uploadImg = require('../middlewares/uploadUserImage');
const adminCheck = require('../middlewares/adminCheck');
const validationRegister = require('../validations/validationRegister');
const passCheck = require('../middlewares/passCheck');


router.get('/', adminCheck, adminController.index);
router.get('/users/list', adminCheck, adminController.listUser);

router.get('/users/create', adminCheck, adminController.register);
router.post('/users/create', adminCheck, validationRegister, uploadImg.any(), adminController.proccesRegister);

router.get('/users/:id', adminCheck, adminController.getUser);

router.get('/users/:id/edit', adminCheck, adminController.editUser);
router.put('/users/:id/update', adminCheck, uploadImg.single('avatar'), adminController.updateUser);

router.delete('/users/:id/delete', adminCheck, adminController.deleteUser);

router.get('/users/:id/pass', adminCheck, passCheck, adminController.changePassword);
router.put('/users/:id/pass', adminCheck, passCheck, adminController.updatePassword);

module.exports = router;