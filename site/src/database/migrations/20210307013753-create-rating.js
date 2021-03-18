'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ratings', {
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
			accumulated_rating: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			total_votes: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			avg_rating: {
				allowNull: false,
				type: Sequelize.DOUBLE
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
		await queryInterface.addConstraint('ratings', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_ratings_movies_movie',
			references: {
				table: 'movies',
				field: 'id'
			}
		});		
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('ratings');
		await queryInterface.removeConstraint('ratings', 'fk_ratings_movies_movie');
	}
};