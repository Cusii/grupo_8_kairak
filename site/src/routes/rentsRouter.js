const express = require('express');
const router = express.Router();

const {rateMovie,toRateMovieForm} = require('../controllers/rentsController');
const userCheck = require('../middlewares/userCheck');

router.get('/:id', userCheck, toRateMovieForm);
router.put('/:id', userCheck, rateMovie);

module.exports = router;