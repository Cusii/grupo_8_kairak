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
    },

    getSales: async (req, res) => {
        try {            
            let sales = await db.MovieSale.findAll({
                where: {
                    status: 1
                },
                include: {
                    association: "movie"
                }
            }); 
            
            res.render('admin/sales', {
                title: 'Ofertas vigentes',
                css: '',
                sales
            })
            
        } catch (error) {
            res.render('error', {error});
        }
    },

    getSale: async (req, res) => {
        try {            
            let sale = await db.MovieSale.findOne({
                where: {
                    status: 1,
                    id: +req.params.id
                },
                include: {
                    association: "movie"
                }
            });
            
            res.render('admin/saleDetail', {
                title: sale.movie.name,
                css: '',
                sale
            })
            
        } catch (error) {
            res.render('error', {error});
        }
    },

    toCreateSale: (req, res) => {
        res.render('admin/createSale');
    },

    createSale: async (req, res) => {
        res.redirect('/sales/show');
    },

    editSale: (req, res) => {
        res.render('admin/editSale');
    },

    updateSale: async (req, res) => {
        res.redirect('/sales/show');
    },

    deleteSale: async (req, res) => {
        res.redirect('/sales/show');
    }

}