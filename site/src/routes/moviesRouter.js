const express = require('express');
const router = express.Router();

const { createMovie, deleteMovie, getMovie, getMovies, toCreateMovie, toEditMovie, updateMovie, showMovies, showMovie } = require('../controllers/moviesController');

const uploadImg = require('../middlewares/uploadMovieImage');

/* 
router.get('/', getMovies);
router.post('/', uploadImg.single('img-movie'), createMovie);

router.get('/create', toCreateMovie) */

router.route('/')
    .get(getMovies)
    .post(uploadImg.single('img-movie'), [], createMovie);

router.route('/create').get(toCreateMovie);

router.route('/show').get(showMovies);
router.route('/show/:id').get(showMovie);

router.route('/:id')
    .get(getMovie)
    .put(uploadImg.single('img-movie'), updateMovie)
    .delete(deleteMovie)

router.route('/:id/edit').get(toEditMovie);


module.exports = router;