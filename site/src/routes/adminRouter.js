const express = require('express');
const router = express.Router(); //trae el metodo router

const adminController = require('../controllers/adminController')

const uploadImg = require('../middlewares/uploadUserImage');
const loginCheak = require('../middlewares/loginCheak');
const validationRegister = require('../validations/validationRegister')


router.get('/', loginCheak, adminController.index)
router.get('/users/list', adminController.listUser)

router.get('/users/create', loginCheak, adminController.register)
router.post('/users/create', validationRegister, uploadImg.any(), adminController.proccesRegister)

router.get('/users/edit/:id', loginCheak, adminController.editUser)
router.put('/users/update/:id', uploadImg.single('avatar'), adminController.updateUser)

router.delete('/users/delete/:id', adminController.deleteUser)

module.exports = router;