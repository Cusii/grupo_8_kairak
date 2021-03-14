'use strict';

const rankings_movies_users = [
	{
		movie_id: 4,
		user_id: 1,
		ranking: 3
	}
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('rankings_movies_users', rankings_movies_users, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('rankings_movies_users', null, {});
		
	}
};
