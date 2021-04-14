'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint('tmp_reset_pass', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'fk_tmpresetpass_users_user',
			references: {
			  	table: 'users',
			  	field: 'id'
			},
			onDelete: 'CASCADE'
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint('tmp_reset_pass', 'fk_tmpresetpass_users_user');
	}
};
