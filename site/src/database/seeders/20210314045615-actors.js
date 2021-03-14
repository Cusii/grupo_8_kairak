'use strict';
const actors = [
	//movie 1
	{ first_name: 'Ryan', last_name: 'Gosling' },
	{ first_name: 'Emma', last_name: 'Stone' },
	//movie 2
	{ first_name: 'Robert', last_name: 'Downey Jr.' },
	{ first_name: 'Chris', last_name: 'Evans' },
	{ first_name: 'Mark', last_name: 'Ruffalo' },
	{ first_name: 'Chris', last_name: 'Hemsworth' },
	{ first_name: 'Scarlett', last_name: 'Johansson' },
	{ first_name: 'Jeremy', last_name: 'Renner' },
	{ first_name: 'Tom', last_name: 'Hiddleston' },
	//movie 3
	{ first_name: 'Joaquin', last_name: 'Phoenix' },
	{ first_name: 'Robert', last_name: 'De Niro' },
	//movie 4
	{ first_name: 'Owen', last_name: 'Wilson' }, //movie 7
	{ first_name: 'Daniel Lawrence', last_name: 'Whitney' },
	//movie 5
	{ first_name: 'James Earl', last_name: 'Jones' }, //movie 9
	{ first_name: 'Donald', last_name: 'Glover' },
	{ first_name: 'Beyoncé', last_name: 'Knowles' },
	//movie 6
	{ first_name: 'Tom', last_name: 'Hanks' }, //movie 10
	{ first_name: 'Tim', last_name: 'Allen' }, //movie 10
	//movie 7
	{ first_name: 'Bonnie', last_name: 'Hunt' },
	//movie 8 
	{ first_name: 'Vin', last_name: 'Diesel' },
	{ first_name: 'Eiza', last_name: 'González' },
	//movie 9
	{ first_name: 'Matthew', last_name: 'Broderick' }, 
	{ first_name: 'Jeremy', last_name: 'Irons' },
	//movie 10
	{ first_name: 'Joan', last_name: 'Cusack' },
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('actors', actors, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('actors', null, {});
		
	}
};
