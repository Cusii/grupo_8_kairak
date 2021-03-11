const express = require('express');
const router = express.Router();

const { createMovie, deleteMovie, detail, getMovies, toCreateMovie, toEditMovie, updateMovie } = require('../controllers/moviesController');

const uploadImg = require('../middlewares/uploadMovieImage');

router.route('/')
    .get(getMovies)
    .post(uploadImg.single('img-movie'), createMovie);

router.route('/create').get(toCreateMovie);

router.route('/:id')
    .get(detail)
    .put(uploadImg.single('img-movie'), updateMovie)
    .delete(deleteMovie)

router.route('/:id/edit').get(toEditMovie);


module.exports = router;