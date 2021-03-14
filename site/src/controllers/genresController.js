const db = require('../database/models');

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
                }
            });
    
            let movies =  await genre.getMovies();

            res.render('movies', {
                title: genre.name,
                css: '',
                genres,
                categories,
                movies
            })
        } catch (error) {
            res.render('error', {error});
        }
    }
}