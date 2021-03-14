'use strict';

const directors = [
	{ first_name: 'Damien', last_name: 'Chazelle' },
	{ first_name: 'Joss', last_name: 'Whedon' },
	{ first_name: 'Todd', last_name: 'Phillips' },
	{ first_name: 'John', last_name: 'Lasseter' },
	{ first_name: 'Jon', last_name: 'Favreau' },
	{ first_name: ' Dave', last_name: 'Wilson' },
	{ first_name: 'Roger', last_name: 'Allers' }, 
	{ first_name: 'Rob', last_name: 'Minkoff' }
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('directors', directors, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('directors', null, {});
		
	}
};
