'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('rents', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			movie_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			status: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			amount: {
				allowNull: false,
				type: Sequelize.DECIMAL(7,2)
			},
			transaction: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			rented_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			expired_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('DATE_ADD(now(), INTERVAL 3 DAY)')
			}
		});
		await queryInterface.addConstraint('rents', {
			fields: ['movie_id'],
			type: 'foreign key',
			name: 'fk_rents_movies_movie',
			references: {
			  	table: 'movies',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('rents', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'fk_rents_users_user',
			references: {
			  	table: 'users',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('rents', {
			fields: ['user_id','movie_id','transaction'],
			type: 'unique',
			name: 'uk_rents_user_movie_transaction'
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('rents');
		await queryInterface.removeConstraint('rents', 'fk_rents_movies_movie');
		await queryInterface.removeConstraint('rents', 'fk_rents_users_user');
		await queryInterface.removeConstraint('rents', 'uk_rents_user_movie_transaction');
	}
};