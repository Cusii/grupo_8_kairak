'use strict';

const movies_actors = [
	{ movie_id: 1, actor_id: 1, created_at: new Date() },
	{ movie_id: 1, actor_id: 2, created_at: new Date() },

	{ movie_id: 2, actor_id: 3, created_at: new Date() },
	{ movie_id: 2, actor_id: 4, created_at: new Date() },
	{ movie_id: 2, actor_id: 5, created_at: new Date() },
	{ movie_id: 2, actor_id: 6, created_at: new Date() },
	{ movie_id: 2, actor_id: 7, created_at: new Date() },
	{ movie_id: 2, actor_id: 8, created_at: new Date() },
	{ movie_id: 2, actor_id: 9, created_at: new Date() },

	{ movie_id: 3, actor_id: 10, created_at: new Date() },
	{ movie_id: 3, actor_id: 11, created_at: new Date() },

	{ movie_id: 4, actor_id: 12, created_at: new Date() },
	{ movie_id: 4, actor_id: 13, created_at: new Date() },

	{ movie_id: 5, actor_id: 14, created_at: new Date() },
	{ movie_id: 5, actor_id: 15, created_at: new Date() },
	{ movie_id: 5, actor_id: 16, created_at: new Date() },

	{ movie_id: 6, actor_id: 17, created_at: new Date() },
	{ movie_id: 6, actor_id: 18, created_at: new Date() },

	{ movie_id: 7, actor_id: 19, created_at: new Date() },
	{ movie_id: 7, actor_id: 12, created_at: new Date() },

	{ movie_id: 8, actor_id: 20, created_at: new Date() },
	{ movie_id: 8, actor_id: 21, created_at: new Date() },

	{ movie_id: 9, actor_id: 22, created_at: new Date() },
	{ movie_id: 9, actor_id: 23, created_at: new Date() },
	{ movie_id: 9, actor_id: 14, created_at: new Date() },

	{ movie_id: 10, actor_id: 17, created_at: new Date() },
	{ movie_id: 10, actor_id: 18, created_at: new Date() },
	{ movie_id: 10, actor_id: 24, created_at: new Date() }
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('movies_actors', movies_actors, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('movies_actors', null, {});
		
	}
};
