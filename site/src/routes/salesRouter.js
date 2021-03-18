const express = require('express');
const router = express.Router();

const {showSales,editSale,getSale,getSales,createSale,deleteSale,toCreateSale,updateSale} = require('../controllers/salesController');

router.get('/', showSales);

router.get('/show', getSales);
router.get('/show/:id', getSale);
router.get('/create', toCreateSale);
router.post('/create', createSale);
router.get('/edit/:id', editSale);
router.put('/edit/:id', updateSale);
router.delete('/delete/:id', deleteSale);

module.exports = router;