'use strict';

const names = [
	'Acción', 
	'Animación',
	'Aventura',
	'Bélica',
	'Ciencia ficción',
	'Comedia',
	'Comedia romántica',
	'Crimen',
	'Documental',
	'Drama',
	'Musical',
	'Romance',
	'Suspenso',
	'Terror',
	'Thriller',
	'Western',
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
