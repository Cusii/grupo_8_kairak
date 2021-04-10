const db = require('../database/models')
const calculateSalePrice = require('../functions/calculateSalePrice');

module.exports = {
    index: async (req, res) => {
        try {
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
                sales,
                mostSawMovies,
                calculateSalePrice
            })
            
        } catch (error) {
            res.render('error', {error});
        }        
    }
}