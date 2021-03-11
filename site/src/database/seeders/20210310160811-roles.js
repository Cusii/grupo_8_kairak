'use strict';

const names = ['admin', 'user'];
const roles = [];

names.forEach(name => {
	const role = {
		name,
		created_at: new Date()
	}
	roles.push(role);
});

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('roles', roles, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('roles', null, {});
		
	}
};