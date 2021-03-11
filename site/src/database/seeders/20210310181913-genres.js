'use strict';

const names = [
	'acción', 
	'aventura',
	'comedia',
	'comedia romántica',
	'drama',
	'terror',
	'musical',
	'ciencia ficción',
	'bélica',
	'western',
	'suspenso',
	'thriller',
	'crimen',
	'romance',
	'animación'
];
const genres = [];

names.forEach(name => {
	const genre = {
		name
	}
	genres.push(genre);
});

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('genres', genres, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('genres', null, {});
		
	}
};
