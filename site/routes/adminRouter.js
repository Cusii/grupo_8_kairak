const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router(); //trae el metodo router

const adminController = require('../controllers/adminController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

    }
})
const upload = multer({ storage })


router.get('/login', adminController.loginAdmin)
router.post('/login', adminController.proccesLogin)



router.get('/index', adminController.indexAdmin)
router.get('/users/list', adminController.listUser)

router.get('/users/create', adminController.register)
router.post('/users/store', upload.any(), adminController.proccesRegister)

router.get('/users/edit/:id', adminController.edittUser)
router.put('/users/update/:id', adminController.updateUser)

router.delete('/users/delete/:id', adminController.deleteUser)

module.exports = router;