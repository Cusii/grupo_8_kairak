'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('rented_movies', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			movie_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				unique: true
			},
			counter: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
		await queryInterface.addConstraint('rented_movies', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_rentedmovies_movies_movie',
			references: {
			  	table: 'movies',
			  	field: 'id'
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('rented_movies');
		await queryInterface.removeConstraint('rented_movies', 'fk_rentedmovies_movies_movie');
	}
};