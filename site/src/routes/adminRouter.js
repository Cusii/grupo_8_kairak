const express = require('express');
const router = express.Router(); //trae el metodo router

const adminController = require('../controllers/adminController')

const uploadImg = require('../middlewares/uploadUserImage');


router.get('/index', adminController.index)
router.get('/users/list', adminController.listUser)

router.get('/users/create', adminController.register)
router.post('/users/create', uploadImg.any(), adminController.proccesRegister)

router.get('/users/edit/:id', adminController.editUser)
router.put('/users/update/:id', uploadImg.single('avatar'), adminController.updateUser)

router.delete('/users/delete/:id', adminController.deleteUser)

module.exports = router;