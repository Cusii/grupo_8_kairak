const db = require('../database/models');

module.exports = {
    showSales: async (req, res) => {
        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            let sales = await db.MovieSale.findAll({
                where: {
                    status: 1
                },
                include: {
                    association: "movie"
                }
            });

            let movies = [];
            sales.forEach(sale => {
                movies.push(sale.movie)
            });

            
            res.render('movies', {
                title: 'Nuestras ofertas',
                css: '',
                categories,
                genres,
                movies
            })
            
        } catch (error) {
            res.render('error', {error});
        }
    }
}