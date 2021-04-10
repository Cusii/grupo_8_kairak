const db = require('../database/models');

module.exports = async (req, res, next) => {
    if (!res.locals.Categories) {
        let categories = await db.Category.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.locals.Categories = categories;
    }

    if (!res.locals.Genres) {
        let genres = await db.Genre.findAll();
        res.locals.Genres = genres;
    } 

    if (!res.locals.WALink) {
        res.locals.WALink = process.env.WA;        
    }

    next();
}