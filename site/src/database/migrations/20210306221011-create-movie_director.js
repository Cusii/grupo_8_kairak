'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('movies_directors', {
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
			director_id: {
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
		await queryInterface.addConstraint('movies_directors', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_moviesdirectors_movies_movie',
			references: {
			  	table: 'movies',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('movies_directors', {
			fields: ['director_id'],
			type: 'foreign key',
			name: 'fk_moviesdirectors_directors_director',
			references: {
			  	table: 'directors',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('movies_directors', {
			fields: ['movie_id','director_id'],
			type: 'unique',
			name: 'uk_moviesdirectors_movie_director'
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('movies_directors');
		await queryInterface.removeConstraint('movies_directors', 'fk_moviesdirectors_movies_movie');
		await queryInterface.removeConstraint('movies_directors', 'fk_moviesdirectors_directors_director');
		await queryInterface.removeConstraint('movies_directors', 'uk_moviesdirectors_movie_director');
	}
};