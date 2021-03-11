'use strict';

const bcrypt = require('bcrypt');

const admin = {
	first_name: 'Admin',
	last_name: 'Admin',
	email: 'admin@kairak.com',
	password: bcrypt.hashSync('admin',12),
	avatar: 'avatar-default.png',
	role_id: 1,
	created_at: new Date()
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('users', [admin], {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', {email: 'admin@kairak.com'}, {});
		
	}
};