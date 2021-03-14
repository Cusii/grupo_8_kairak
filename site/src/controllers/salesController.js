const db = require('../database/models');

module.exports = {
    getSales: async (req, res) => {
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
                }
            });

            let movies =  [];
            if (sales.length > 0) {
                movies = await sales.getMovies();                
            }

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