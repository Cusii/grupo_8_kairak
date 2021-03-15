const express = require('express');
const router = express.Router();

const {showSales} = require('../controllers/salesController');

router.get('/', showSales);

module.exports = router;