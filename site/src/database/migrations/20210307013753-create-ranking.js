'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('rankings', {
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
			accumulated_ranking: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			total_votes: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			avg_ranking: {
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
		await queryInterface.addConstraint('rankings', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_rankings_movies_movie',
			references: {
				table: 'movies',
				field: 'id'
			}
		});		
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('rankings');
		await queryInterface.removeConstraint('rankings', 'fk_rankings_movies_movie');
	}
};