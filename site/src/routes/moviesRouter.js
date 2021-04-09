const express = require('express');
const router = express.Router();

const { createMovie, deleteMovie, getMovie, getMovies, search, showMovie, showMovies, toCreateMovie, toEditMovie, updateMovie,watchMovie  } = require('../controllers/moviesController');

const uploadImg = require('../middlewares/uploadMovieImage');
const validationMovie = require('../validations/validationMovie');
const adminCheck = require('../middlewares/adminCheck');
const userCheck = require('../middlewares/userCheck');

router.route('/')
    .get(adminCheck, getMovies)
    .post(adminCheck, uploadImg.single('img-movie'), validationMovie, createMovie);

router.route('/create').get(adminCheck, toCreateMovie);
router.route('/search').get(search);
router.route('/show').get(showMovies);
router.route('/show/:id').get(showMovie);
router.route('/watch/:id').get(userCheck, watchMovie);

router.route('/:id')
    .get(adminCheck, getMovie)
    .put(adminCheck, uploadImg.single('img-movie'), updateMovie)
    .delete(adminCheck, deleteMovie)

router.route('/:id/edit').get(adminCheck, toEditMovie);

module.exports = router;