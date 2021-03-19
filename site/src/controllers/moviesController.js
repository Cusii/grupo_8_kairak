const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { Op } = require("sequelize");
const moviesDB = require('../data/movies');
const movies = moviesDB.getMovies();

module.exports = {
    showMovies: async (req, res) => {
        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            let movies = await db.Movie.findAll({
                where: {
                    status: 1
                }
            });

            res.render('movies', {
                title: 'Nuestras Películas',
                css: '',
                categories,
                genres,
                movies
            })

        } catch (error) {
            res.render('error', {error});
        }
    },

    showMovie: async (req, res) => {
        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            let movie = await db.Movie.findOne({
                where: {
                    id: +req.params.id
                },
                include : [
                    {  association : "genre" },
                    { association : "category" },
                    { association: "sales" }                
                ]
            });

            res.render('movieDetail', {
                title: movie.title,
                css: 'movieStyle',
                categories,
                genres,
                movies,
                movie
            })

        } catch (error) {
            res.render('error', {error});
        }
    },


    /**************************** ADMIN ****************************/
    getMovies: async (req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let movies = await db.Movie.findAll({
                where: {
                    status: 1
                }
            });
    
            res.render('admin/moviesList', {
                title: 'Nuestras Películas',
                css: '',
                movies,
                userAdmin
            })
        } catch (error) {
            res.render('error', {error});
        }
        
    },
    getMovie: async (req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let movie = await db.Movie.findOne({
                where: {
                    id: +req.params.id
                },
                include : [
                    {  association : "genre" },
                    { association : "category" },
                    { association: "sales" }                
                ]
            });

            res.render('admin/movieDetail', {
                title: movie.title,
                css: 'movieStyle',                
                movie,
                userAdmin
            });
        } catch (error) {
            
        }
    },  

    toCreateMovie: async (req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            res.render('admin/createMovie', {
                title: 'Agregar pelicula',
                css: 'formStyles',
                categories,
                genres,
                userAdmin
            })
        } catch (error) {
            res.render('error', {error});
        }        
    },

    createMovie: async (req, res, next) => {
        const { title, description, price, year, length, category, genre, trailerPath, moviePath } = req.body;
        let id = 0

        try {
            let oldMovie = await db.Movie.findOne({
                where: {
                    title: title.toLowerCase().trim()
                }
            });
            
            id = oldMovie.id;         

            if (oldMovie.isNewRecord === false) {
                if (oldMovie.status == false) {
                    await db.Movie.update({
                        title: title.toLowerCase().trim(),
                        description: description,
                        price: price,
                        year: year,
                        length: length,
                        image: req.file.filename,
                        trailerPath: trailerPath,
                        moviePath: moviePath,
                        genreId: genre,
                        categoryId: category,
                        status: 1,
                        createdAt: oldMovie.createdAt
                    }, {
                        where: {
                            id: oldMovie.id
                        }
                    });

                    id = oldMovie.id
                } else {
                    fs.unlinkSync(path.join('public', 'images', 'movies', req.file.filename));
                    console.log('La pelicula ya existe');
                    //provisorio
                    return res.redirect('/movies/create');
                }
            } else {
                let newMovie = await db.Movie.create({
                    title: title.toLowerCase().trim(),
                    description: description,
                    price: price,
                    year: year,
                    length: length,
                    image: req.file.filename,
                    trailerPath: trailerPath,
                    moviePath: moviePath,
                    genreId: genre,
                    categoryId: category,
                    status: 1,
                    createdAt: new Date()
                });

                id = newMovie.id
            }    

            res.redirect(`/movies/${id}`);
        } catch (error) {
            res.render('error', {error});
        }        
    },

    toEditMovie: async (req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            let movie = await db.Movie.findOne({
                where: {
                    id: +req.params.id
                },
                include : [
                    {  association : "genre" },
                    { association : "category" },
                    { association: "sales" }                
                ]
            });

            
            res.render('admin/editMovie', {
                title: movie.title,
                css: 'formStyles',
                categories,
                genres,
                movie,
                userAdmin
            });

        } catch (error) {
            res.render('error', {error});
        }        
    },

    updateMovie: async (req, res, next) => {
        const { title, description, price, year, length, category, genre, trailerPath, moviePath, image } = req.body;
        const imgFile = req.file;
        let imagePath = image;

        if (imgFile) {
            if (fs.existsSync(path.join('public', 'images', 'movies', movie.image))) {
                fs.unlinkSync(path.join('public', 'images', 'movies', movie.image));
            }
            imagePath = req.file.filename
        }

        try {
            await db.Movie.update({
                title: title.toLowerCase().trim(),
                description: description,
                price: price,
                year: year,
                length: length,
                image: imagePath,
                trailer: trailerPath,
                movie: moviePath,
                genreId: genre,
                categoryId: category
            },{
                where: {
                    id: +req.params.id
                }
            });

            res.redirect(`/movies/${req.params.id}`);
        } catch (error) {
            res.render('error', {error});
        }        
    },

    deleteMovie: async (req, res) => {
        const id = Number(req.params.id);

        const t = await db.sequelize.transaction();

        try {
            let rents = await db.Rent.findAll({
                where: {
                    movieId: id,
                    status: 1
                }
            });

            if (rents.length === 0) {   
    
                let sale = await db.MovieSale.findOne({
                    where: {
                        movieId: id,
                        status: 1
                    }
                });  
                
    
                await db.Movie.update({                    
                    status: 0
                },{
                    where: {
                        id: id
                    }
                }, { transaction: t });

                if (sales.length > 0) {
                    await db.MovieSale.update({
                        status: 0,
                        expiredAt: new Date()
                    },{
                        where: {
                            movieId: id,
                            id: sale.id
                        }
                    }, { transaction: t })
                }                

                await t.commit();
            } else {
                console.log("No se puede eliminar la pelicula, actualmente está en uso por usuarios");
            }

            res.redirect('/movies');
        } catch (error) {
            await t.rollback();
            res.render('error', {error})
        }
    }
}