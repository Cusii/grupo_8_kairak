const fs = require('fs');
const path = require('path');
const moviesDB = require('../data/movies');
const movies = moviesDB.getProducts();

module.exports = {
    getMovies: (req, res) => {
        res.render('productDetail', {
            title: 'Kairak',
            css: 'productDetail'
        })
    },
    detail: (req, res) => {
        const id = Number(req.params.id);

        let movie = products.find(movies => movie.id === id);

        res.render('productDetail', {
            title: 'Kairak',
            css: 'productDetail',
            movie
        });

    },
    toAddMovie: (req, res) => {
        res.render('cargaProducto', {
            title: 'Agregar pelicula',
            css: 'styleFormularios'
        })
    },
    addMovie: (req, res, next) => {
        
    },
    toEditMovie: (req, res) => {
        const movie = movies.find(movie => movie.id === +req.params.id);

        res.render('',{

        });
    },
    updateMovie: (req, res) => {
        
    },
    deleteMovie: (req, res) => {
        const id = Number(req.params.id);

        movies.forEach(movie => {
            if (movie.id === id) {
                if(fs.existsSync(path.join('public','images','movies',movie.image))){
                    fs.unlinkSync(path.join('public','images','movies',movie.image));
                }
                let movieToDelete = movies.indexOf(movie);
                movies.splice(movieToDelete,1);
            }
        });

        moviesDB.setMovies(movies);

        res.redirect('/');

    }
}