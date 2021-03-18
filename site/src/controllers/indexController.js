//const moviesDB = require('../data/movies');
const db = require('../database/models')
//const movies = moviesDB.getMovies();

module.exports = {
    index: async (req, res) => {
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
                },
                include: {
                    association: "rating"
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            let mostSawMovies = await db.RentedMovie.findAll({
                order: [
                    ['counter', 'ASC']
                ],
                include: {
                    association: "movie"
                }
            });

            let sales = await db.MovieSale.findAll({
                where: {
                    status: 1
                },
                include: {
                    association: "movie"
                }
            });
            


            //let premiereMovies = await movies.;

            res.render('index', {
                title: 'Kairak',
                css: '',
                movies,
                categories,
                genres,
                sales,
                mostSawMovies
            })
            
        } catch (error) {
            res.render('error', {error});
        }        
    }
}