//const moviesDB = require('../data/movies');
const db = require('../database/models')
//const movies = moviesDB.getMovies();

const wa_link = process.env.WA;

const calculateSalePrice = (price, discount) => {
    let newPrice = price - (discount * price /100);
    return parseFloat(Math.round(newPrice * 100) / 100).toFixed(2);
}

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
                include: [
                    { association: "rating" },
                    {
                        association: 'sales',
                        where: {status:1},
                        required: false
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            let mostSawMovies = await db.RentedMovie.findAll({
                order: [
                    ['counter', 'ASC']
                ],
                include: {
                    association: "movie",
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
                }
            });            

            let sales = await db.MovieSale.findAll({
                where: {
                    status: 1
                },
                include: {
                    association: "movie",
                    where: { status: 1 },
                    include: {
                        association: 'rating'
                    },
                    required: true
                }
            });                

            res.render('index', {
                title: 'Kairak',
                css: '',
                movies,
                categories,
                genres,
                sales,
                mostSawMovies,
                wa_link,
                calculateSalePrice
            })
            
        } catch (error) {
            res.render('error', {error});
        }        
    }
}