const express = require('express');
const router = express.Router();

const {getGenres, getGenre} = require('../controllers/genresController');

router.get('/', getGenres);
router.get('/:id', getGenre);

module.exports = router;