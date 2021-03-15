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
                },
                include: {
                    association: "movies"
                }
            });      

            res.render('movies', {
                title: genre.name,
                css: '',
                genres,
                categories,
                movies: genre.movies
            })
        } catch (error) {
            res.render('error', {error});
        }
    }
}