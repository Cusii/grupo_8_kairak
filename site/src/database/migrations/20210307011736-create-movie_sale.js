'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('movies_sales', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			movie_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			discount: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			status: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			expired_at: {
				allowNull: false,
				type: Sequelize.DATE
			},			
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
		await queryInterface.addConstraint('movies_sales', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_moviessales_movies_movie',
			references: {
				table: 'movies',
				field: 'id'
			}
		});		
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('movies_sales');
		await queryInterface.removeConstraint('movies_sales', 'fk_moviessales_movies_movie');
	}
};