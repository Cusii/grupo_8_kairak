const db = require('../database/models');
const calculateSalePrice = require('../functions/calculateSalePrice');

module.exports = {
    getGenres: (req, res) => {

    },

    getGenre: async(req, res) => {
        try {

            let genre = await db.Genre.findOne({
                where: {
                    id: +req.params.id
                },
                include: {
                    association: "movies",
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
                    ],
                    required: false
                }
            });    

            res.render('movies', {
                title: genre.name,
                css: '',
                movies: genre.movies,                
                calculateSalePrice
            })
        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    }
}