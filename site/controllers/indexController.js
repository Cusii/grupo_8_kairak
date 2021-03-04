const moviesDB = require('../data/movies');
const movies = moviesDB.getMovies();

module.exports = {
    index: (req, res) => {
        res.render('index', {
            title: 'Kairak',
            css: '',
            movies
        })
    }
}