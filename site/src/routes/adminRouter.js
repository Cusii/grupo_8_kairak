const express = require('express');
const router = express.Router(); //trae el metodo router

const adminController = require('../controllers/adminController')

const uploadImg = require('../middlewares/uploadUserImage');


//router.get('/login', adminController.loginAdmin)
//router.post('/login', adminController.proccesLogin)

router.get('/index', adminController.indexAdmin)
router.get('/users/list', adminController.listUser)

router.get('/users/create', adminController.register)
router.post('/users/store', uploadImg.any(), adminController.proccesRegister)

router.get('/users/edit/:id', adminController.edittUser)
router.put('/users/update/:id', adminController.updateUser)

router.delete('/users/delete/:id', adminController.deleteUser)

module.exports = router;