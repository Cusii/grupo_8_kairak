const db = require('../database/models');

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
                rent,
                user
            });

        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    },

    rateMovie: async (req, res) => {
        const rentID = +req.params.id;
        const { rating } = req.body;

        const userID = req.session.userLogin.id;    

        try {
            await db.RatingMovieUser.update({
                rating: rating,
                done: true
            }, {
                where: {
                    rentId: rentID
                }
            });

            
            res.redirect(`/users/${userID}/rents`);            

        } catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.render("tech-difficulties");
        }
    }
}