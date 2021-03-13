'use strict';

const names = [
	'Acción', 
	'Aventura',
	'Comedia',
	'Comedia romántica',
	'Drama',
	'Terror',
	'Musical',
	'Ciencia ficción',
	'Bélica',
	'Western',
	'Suspenso',
	'Thriller',
	'Crimen',
	'Romance',
	'Animación'
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
