const express = require('express');
const router = express.Router();

const { index } = require('../controllers/usersController');

/* GET users listing. */
router.get('/', index);

module.exports = router;
