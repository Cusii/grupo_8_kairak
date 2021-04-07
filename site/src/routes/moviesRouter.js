const express = require('express');
const router = express.Router();

const { createMovie, deleteMovie, getMovie, getMovies, search, showMovie, showMovies, toCreateMovie, toEditMovie, updateMovie } = require('../controllers/moviesController');

const uploadImg = require('../middlewares/uploadMovieImage');
const validationMovie = require('../validations/validationMovie')

/* router.get('/', getMovies);
router.post('/', uploadImg.single('img-movie'), validationMovie, createMovie);

router.get('/create', toCreateMovie);

router.get('/search', search);

router.get('/show',showMovies);
router.get('/show/:id',showMovie);

router.get('/:id', getMovie);
router.put('/:id', uploadImg.single('img-movie'), updateMovie)
router.delete('/:id', deleteMovie) 

router.get('/:id/edit', toEditMovie);
*/

router.route('/')
    .get(getMovies)
    .post(uploadImg.single('img-movie'), validationMovie, createMovie);

router.route('/create').get(toCreateMovie);
router.route('/search').get(search);
router.route('/show').get(showMovies);
router.route('/show/:id').get(showMovie);

router.route('/:id')
    .get(getMovie)
    .put(uploadImg.single('img-movie'), updateMovie)
    .delete(deleteMovie)

router.route('/:id/edit').get(toEditMovie);




module.exports = router;