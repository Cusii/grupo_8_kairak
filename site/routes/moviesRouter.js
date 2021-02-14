const express = require('express');
const router = express.Router();

const {addMovie,deleteMovie,detail,getMovies,toAddMovie,toEditMovie,updateMovie} = require('../controllers/moviesController');

const uploadImg = require('../middlewares/uploadMovieImage');

router.route('/')
    .get(getMovies)
    .post(uploadImg.single('movie'), addMovie);

router.route('/:id')
    .get(detail)
    .put(uploadImg.single('movie') ,updateMovie)
    .delete(deleteMovie);

router.route('/:id/edit').get(toEditMovie);

router.route('/add').get(toAddMovie);

module.exports = router;