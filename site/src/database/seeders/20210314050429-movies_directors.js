'use strict';

const movies_directors = [	
	{ movie_id: 1, director_id: 1, created_at: new Date() },
	{ movie_id: 2, director_id: 2, created_at: new Date() },
	{ movie_id: 3, director_id: 3, created_at: new Date() },
	{ movie_id: 4, director_id: 4, created_at: new Date() },
	{ movie_id: 5, director_id: 5, created_at: new Date() },
	{ movie_id: 6, director_id: 4, created_at: new Date() },
	{ movie_id: 7, director_id: 4, created_at: new Date() },
	{ movie_id: 8, director_id: 6, created_at: new Date() },
	{ movie_id: 9, director_id: 7, created_at: new Date() },
	{ movie_id: 9, director_id: 8, created_at: new Date() },
	{ movie_id: 10, director_id: 4, created_at: new Date() }	
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('movies_directors', movies_directors, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('movies_directors', null, {});
		
	}
};
