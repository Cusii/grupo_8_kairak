'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('rankings_movies_users', {
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
			ranking: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
		await queryInterface.addConstraint('rankings_movies_users', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_rankingsmoviesusers_movies_movie',
			references: {
			  	table: 'movies',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('rankings_movies_users', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'fk_rankingsmoviesusers_users_user',
			references: {
			  	table: 'users',
			  	field: 'id'
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('rankings_movies_users');
		await queryInterface.removeConstraint('rankings_movies_users', 'fk_rankingsmoviesusers_movies_movie');
		await queryInterface.removeConstraint('rankings_movies_users', 'fk_rankingsmoviesusers_users_user');
	}
};