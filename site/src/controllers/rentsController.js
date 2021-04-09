const db = require('../database/models');
const wa_link = process.env.WA;

const ratingScale = [
    {num: 1, name: 'Mala'},
    {num: 2, name: 'Regular'},
    {num: 3, name: 'Buena'},
    {num: 4, name: 'Muy buena'},
    {num: 5, name: 'Excelente'},
];

module.exports = {
    toRateMovieForm: async (req, res) => {
        const rentID = req.params.id;
        console.log(rentID);

        const { id, firstName, lastName, role } = req.session.userLogin;
        let user = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            let rent = await db.Rent.findOne(
                {
                    where: { id: rentID },
                    include: {
                        association: 'movie'
                    }
                }
            );

            res.render('rateMovie',{
                title: rent.movie.title,
                css: '',
                ratingScale,
                genres,
                categories,
                rent,
                user,
                wa_link
            });

        } catch (error) {
            res.render('error', { error });
        }
    },

    rateMovie: async (req, res) => {
        const rentID = +req.params.id;
        const { rating } = req.body;

        const { id, firstName, lastName, role } = req.session.userLogin;
        let user = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            await db.RatingMovieUser.update({
                rating: rating,
                done: true
            }, {
                where: {
                    rentId: rentID
                }
            });

            
            res.redirect(`/users/${user.id}/rents`);            

        } catch (error) {
            res.render('error', { error });
        }
    }
}