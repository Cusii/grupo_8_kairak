const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { Op } = require("sequelize");
const { check, validationResult, body } = require('express-validator');
const calculateSalePrice = require('../functions/calculateSalePrice');

module.exports = {
    showMovies: async(req, res) => {
        try {
            let movies = await db.Movie.findAll({
                where: {
                    status: 1
                },
                include: [
                    {
                        association: "rating"
                    },
                    {
                        association: "sales",
                        where: {status: 1},
                        required: false
                    }
                ]    
            });

            res.render('movies', {
                title: 'Nuestras Películas',
                css: '',
                movies,
                calculateSalePrice
            })

        } catch (error) {
            res.render('error', { error });
        }
    },

    showMovie: async(req, res) => {
        try {
            let movie = await db.Movie.findOne({
                where: {
                    id: +req.params.id
                },
                include: [
                    { association: "genre" },
                    { association: "category" },
                    { association: "rating" },
                    {
                        association: "sales",
                        where: {status: 1},
                        required: false
                    }
                ]
            });

            res.render('movieDetail', {
                title: movie.title,
                css: 'movieStyle',
                movies,
                movie,
                calculateSalePrice
            })

        } catch (error) {
            res.render('error', { error });
        }
    },
    search: async(req, res) => {
        console.log(req.query.search);        
        const search = req.query.search.trim().toLowerCase();
        
        try {
            const moviesFilter = await db.Movie.findAll({
                include: [
                    { association: "genre", required: true },
                    { association: "rating", required: true },
                    {
                        association: "sales",
                        where: {status: 1},
                        required: false
                    }
                ],
                where: {
                    [Op.and]: [
                        { status: 1 },
                        {[Op.or]: [                        
                            { '$genre.name$': { [Op.like]: `%${search}%` } },
                            { title: { [Op.like]: `%${search}%` } }
                        ]}
                    ]
                },
            });
    
            res.render('movies', {
                title: `Resultados de la busqueda: ${search} `,
                css: '',
                movies: moviesFilter,
                calculateSalePrice
            })
        } catch (error) {
            res.render('error', { error });
        }
        
        
    },   

    watchMovie: async (req, res) => {
        const { id, firstName, lastName, role } = req.session.userLogin;
        let user = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let movie = await db.Movie.findOne({
                where: {
                    id: +req.params.id
                }                
            });

            res.render('watchMovie', {
                title: movie.title,
                css: 'movieStyle',
                movie,
                //userLogin: user
            })

        } catch (error) {
            res.render('error', { error });
        }
    },

    /**************************** ADMIN ****************************/

    getMovies: async(req, res) => {
        const { id, firstName, lastName, role } = req.session.userLogin;
        let userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let movies = await db.Movie.findAll({
                where: {
                    status: 1
                },
                include: [
                    { association: "genre" },
                    { association: "category" },
                    { association: "rating" },
                    {
                        association: "sales",
                        where: {status: 1},
                        required: false
                    }
                ]
            });

            res.render('admin/moviesList', {
                title: 'Nuestras Películas',
                css: '',
                movies,
                userAdmin,
                calculateSalePrice
            })
        } catch (error) {
            res.render('error', { error });
        }

    },
    getMovie: async(req, res) => {
        const { id, firstName, lastName, role } = req.session.userLogin;
        let userAdmin = {
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
                include: [
                    { association: "genre" },
                    { association: "category" },
                    { association: "rating" },
                    {
                        association: "sales",
                        where: {status: 1},
                        required: false
                    }
                ]
            });

            res.render('admin/movieDetail', {
                title: movie.title,
                css: 'movieStyle',
                movie,
                userAdmin,
                calculateSalePrice
            });
        } catch (error) {

        }
    },

    toCreateMovie: async(req, res) => {
        const { id, firstName, lastName, role } = req.session.userLogin;
        let userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            res.render('admin/createMovie', {
                title: 'Agregar pelicula',
                css: 'forms',
                userAdmin
            })
        } catch (error) {
            res.render('error', { error });
        }
    },

    createMovie: async(req, res, next) => {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('admin/createMovie', {
                errors: errors.mapped(),
                title: 'Kairak',
                css: 'forms',
                userAdmin
            })
        }

        const { title, description, price, year, length, category, genre, trailerPath, moviePath } = req.body;
        let id = 0

        try {
            let oldMovie = await db.Movie.findOne({
                where: {
                    title: title.toLowerCase().trim()
                }
            });


            if (oldMovie) {
                id = oldMovie.id;
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
            res.render('error', { error });
        }
    },

    toEditMovie: async(req, res) => {
        const { id, firstName, lastName, role } = req.session.userLogin;
        let userAdmin = {
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
                include: [
                    { association: "genre" },
                    { association: "category" },
                    { association: "sales" }
                ]
            });


            res.render('admin/editMovie', {
                title: movie.title,
                css: 'forms',
                movie,
                userAdmin
            });

        } catch (error) {
            res.render('error', { error });
        }
    },

    updateMovie: async(req, res, next) => {
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
            }, {
                where: {
                    id: +req.params.id
                }
            });

            res.redirect(`/movies/${req.params.id}`);
        } catch (error) {
            res.render('error', { error });
        }
    },

    deleteMovie: async(req, res) => {
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
                }, {
                    where: {
                        id: id
                    }
                }, { transaction: t });

                if (sale) {
                    await db.MovieSale.update({
                        status: 0,
                        expiredAt: new Date()
                    }, {
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
            res.render('error', { error })
        }
    },

    
}