const db = require('../database/models');
const calculateSalePrice = require('../functions/calculateSalePrice');


module.exports = {
    getCategories: (req, res) => {

    },

    getCategory: async (req, res) => {
        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();

            let category = await db.Category.findOne({
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

            switch (category.name) {
                case 'ATP':
                    category.name = 'Apta para todo publico';
                    break;

                case '+7':
                    category.name = 'Para mayores de 7 años';
                    break;

                case '+13':
                    category.name = 'Para mayores de 13 años';
                    break;

                case '+16':
                    category.name = 'Para mayores de 16 años';
                    break;

                case '+18':
                    category.name = 'Para mayores de 18 años';
                    break; 
                
                default:
                    break;
            }    

            res.render('movies', {
                title: category.name,
                css: '',
                categories,
                genres,
                movies: category.movies,                
                calculateSalePrice
            })
        } catch (error) {
            res.render('error', {error});
        }
    }
}