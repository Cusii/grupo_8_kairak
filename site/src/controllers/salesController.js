const db = require('../database/models');
const { Op } = require("sequelize");

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
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }
        
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
                sales,
                userAdmin
            })
            
        } catch (error) {
            res.render('error', {error});
        }
    },

    getSale: async (req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }
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
                sale,
                userAdmin
            })
            
        } catch (error) {
            res.render('error', {error});
        }
    },

    toCreateSale: async (req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let sales = await db.MovieSale.findAll({
                where: {
                    status: 1
                }
            });

            let idsMovieSale = [];
            sales.forEach(sale => {
                idsMovieSale.push(sale.id);
            });

            let movies = await db.Movie.findAll({
                where: {
                    status: 1,
                    id: {
                        [Op.notBetween]: idsMovieSale
                    }
                }
            });

            res.render('admin/createSale', {
                title: 'Cargar nueva oferta',
                css: '',
                movies,
                userAdmin
            });
        } catch (error) {
            res.render('error', {error});
        }
        
    },

    createSale: async (req, res) => {
        const { discount, movieId,  expiredAt } = req.body;

        try {
            let newSale = await db.MovieSale.create({
                discount,
                movieId,
                expiredAt,
                status: 1
            })
            res.redirect(`/sales/show/${newSale.id}`);
        } catch (error) {
            res.render('error', {error});
        }
    },

    editSale: async (req, res) => {
        const { id, firstName, lastName, role} = req.session.userLogin;
        userAdmin = {
            id,
            firstName,
            lastName,
            role
        }

        try {
            let sale = await db.MovieSale.findOne({
                where: {
                    id: +req.params.id
                },
                include: {
                    association: "movie"
                }
            });

            res.render('/admin/editSale',{
                title: 'Editar oferta',
                sale,
                userAdmin
            });
        } catch (error) {
            res.render('error', {error});
        }
    },

    updateSale: async (req, res) => {
        const { discount, /* createdAt, */ expiredAt } = req.body;
        try {
            let sale = await db.MovieSale.update({
                discount,
                expiredAt 
            }, {
                where: {id: +req.params.id }
            })
            res.redirect(`/sales/show/${sale.id}`);
        } catch (error) {
            res.render('error', {error});
        }
    },

    deleteSale: async (req, res) => {
        try {
            await db.MovieSale.update({
                status: 0,
                expiredAt: new Date()
            },{
                where: {
                    id: +req.params.id    
                }
            });
            res.redirect('/sales/show');
        } catch (error) {
            res.render('error', {error});
        }
    }

}