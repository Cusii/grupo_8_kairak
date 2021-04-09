const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

const uploadImg = require('../middlewares/uploadUserImage');
const adminCheck = require('../middlewares/adminCheck');
const validationRegister = require('../validations/validationRegister')


router.get('/', adminCheck, adminController.index)
router.get('/users/list', adminCheck, adminController.listUser)

router.get('/users/create', adminCheck, adminController.register)
router.post('/users/create', adminCheck, validationRegister, uploadImg.any(), adminController.proccesRegister)

router.get('/users/edit/:id', adminCheck, adminController.editUser)
router.put('/users/update/:id', adminCheck, uploadImg.single('avatar'), adminController.updateUser)

router.delete('/users/delete/:id', adminCheck, adminController.deleteUser)

module.exports = router;