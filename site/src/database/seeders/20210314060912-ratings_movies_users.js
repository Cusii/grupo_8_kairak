'use strict';

const ratings_movies_users = [
	{
		movie_id: 4,
		user_id: 1,
		rent_id: 1,
		rating: 3,
		done: true
	}
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('ratings_movies_users', ratings_movies_users, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('ratings_movies_users', null, {});
		
	}
};
