'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ratings_movies_users', {
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
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			rating: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
		await queryInterface.addConstraint('ratings_movies_users', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_ratingsmoviesusers_movies_movie',
			references: {
			  	table: 'movies',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('ratings_movies_users', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'fk_ratingsmoviesusers_users_user',
			references: {
			  	table: 'users',
			  	field: 'id'
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('ratings_movies_users');
		await queryInterface.removeConstraint('ratings_movies_users', 'fk_ratingsmoviesusers_movies_movie');
		await queryInterface.removeConstraint('ratings_movies_users', 'fk_ratingsmoviesusers_users_user');
	}
};