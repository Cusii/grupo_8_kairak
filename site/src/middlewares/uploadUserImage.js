const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('public', 'images','users'))
    },
    filename: (req, file, cb) => {
        cb(null, 'img-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" 
        || file.mimetype == "image/jpg" 
        || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        req.fileValidationError = "Por favor ingrese formatos permitidos: .png, .jpg and .jpeg";
        cb(null, false, req.fileValidationError); 
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter
})