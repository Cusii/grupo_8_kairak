const express = require('express');
const router = express.Router();

const {showSales,editSale,getSale,getSales,createSale,deleteSale,toCreateSale,updateSale} = require('../controllers/salesController');

const adminCheck = require('../middlewares/adminCheck');

router.get('/', showSales);

router.get('/show', adminCheck, getSales);
router.get('/show/:id', adminCheck, getSale);
router.get('/create', adminCheck, toCreateSale);
router.post('/create', adminCheck, createSale);
router.get('/edit/:id', adminCheck, editSale);
router.put('/edit/:id', adminCheck, updateSale);
router.delete('/delete/:id', adminCheck, deleteSale);

module.exports = router;