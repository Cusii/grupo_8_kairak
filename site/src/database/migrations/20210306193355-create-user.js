'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			first_name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			last_name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			avatar: {
				allowNull: false,
				type: Sequelize.STRING
			},
			role_id: {
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
		await queryInterface.addConstraint('users', {
			fields: ['role_id'],
			type: 'foreign key',
			name: 'fk_users_roles_role',
			references: {
			  	table: 'roles',
			  	field: 'id'
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('users');
		await queryInterface.removeConstraint('users', 'fk_users_roles_role');
	}
};