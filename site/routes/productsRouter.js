const express = require('express');
const router = express.Router(); //trae el metodo router

const {addProduct, deleteProduct, detail, getProducts, toAddProduct, toEditProduct, updateProduct} = require('../controllers/productsController');

router.route('/')
    .get(getProducts)
    .post(addProduct);

router.route('/:id')
    .get(detail)
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/:id/edit').get(toEditProduct);

router.route('/add').get(toAddProduct);

module.exports = router;