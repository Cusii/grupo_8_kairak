'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('movies_actors', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			actor_id: {
				type: Sequelize.INTEGER
			},
			movie_id: {
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
		await queryInterface.addConstraint('movies_actors', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_moviesactors_movies_movie',
			references: {
			  	table: 'movies',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('movies_actors', {
			fields: ['actor_id'],
			type: 'foreign key',
			name: 'fk_moviesactors_actors_actor',
			references: {
			  	table: 'actors',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('movies_actors', {
			fields: ['movie_id','actor_id'],
			type: 'unique',
			name: 'uk_moviesactors_movie_actor'
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('movies_actors');
		await queryInterface.removeConstraint('movies_actors', 'fk_moviesactors_movies_movie');
		await queryInterface.removeConstraint('movies_actors', 'fk_moviesactors_actors_actor');
		await queryInterface.removeConstraint('movies_actors', 'uk_moviesactors_movie_actor');
	}
};