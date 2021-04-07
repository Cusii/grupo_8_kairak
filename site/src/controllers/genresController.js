const db = require('../database/models');
const wa_link = process.env.WA;

const calculateSalePrice = (price, discount) => {
    let newPrice = price - (discount * price /100);
    return parseFloat(Math.round(newPrice * 100) / 100).toFixed(2);
}

module.exports = {
    getGenres: (req, res) => {

    },

    getGenre: async(req, res) => {
        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();


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
                genres,
                categories,
                movies: genre.movies,
                wa_link,
                calculateSalePrice
            })
        } catch (error) {
            res.render('error', {error});
        }
    }
}