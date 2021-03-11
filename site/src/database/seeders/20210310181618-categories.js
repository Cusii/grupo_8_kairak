'use strict';

const names = ['ATP', '+13','+16'];
const categories = [];

names.forEach(name => {
	const category = {
		name
	}
	categories.push(category);
});

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('categories', categories, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('categories', null, {});
		
	}
};
