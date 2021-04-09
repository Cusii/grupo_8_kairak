const db = require('../database/models');
const { format } = require('date-fns');
const { Op } = require("sequelize");
const wa_link = process.env.WA


const calculateSalePrice = (price, discount) => {
    let newPrice = price - (discount * price /100);
    return parseFloat(Math.round(newPrice * 100) / 100).toFixed(2);
}

module.exports = {
    /**
     * Retorna una lista con las ofertas vigentes
     */
    showSales: async (req, res) => {
        try {
            let categories = await db.Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            let genres = await db.Genre.findAll();            

            let moviesWithSales = await db.Movie.findAll({
                where: {
                    status: 1
                },
                include: [
                    {
                        association: 'sales',
                        where:{ status: 1 },
                        required: true
                    },
                    {
                        association: 'rating'
                    }
                ]
            });
            
            res.render('movies', {
                title: 'Nuestras ofertas',
                css: '',
                categories,
                genres,
                movies: moviesWithSales,
                wa_link,
                calculateSalePrice
            })
            
        } catch (error) {
            res.render('error', {error});
        }
    },

    /**
     * Retorna una lista con las ofertas vigentes (vista admin)
     */
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
                    association: "movie",
                    where: { status: 1 },
                    include: {
                        association: 'rating'
                    },
                    required: true
                }
            });

            let salesMapped = sales.map((sale) => {
                console.log(sale);
                sale.expiredAt = format(new Date(sale.expiredAt), 'dd-MM-yyyy')
                console.log(sale);
                return sale;
            });

            let formatDate = (date) => {
                return format(new Date(date), 'dd-MM-yyyy')                
            }
            
            res.render('admin/sales', {
                title: 'Ofertas vigentes',
                css: '',
                sales,
                userAdmin,
                formatDate
            })
            
        } catch (error) {
            res.render('error', {error});
        }
    },

    /**
     * Retorna el detalle de una oferta vigente (vista admin)
     */
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
                    association: "movie",
                    where: { status: 1 },
                    include: {
                        association: 'rating'
                    },
                    required: true
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

    /**
     * Renderiza el formulario de creación de oferta
     */
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
                css: 'forms',
                movies,
                userAdmin
            });
        } catch (error) {
            res.render('error', {error});
        }
        
    },

    /**
     * Crea una nueva oferta
     */
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

    /**
     * Renderiza el formulario de edición de una oferta
     */
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

    /**
     * Actualiza una oferta
     */
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

    /**
     * Elimina una oferta
     */
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