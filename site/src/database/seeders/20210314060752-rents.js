'use strict';

let date = new Date();
date.setDate(date.getDate() + 3);

const rents = [
	{
		user_id: 1,
		movie_id: 5,
		status: 1,
		amount: 255,
		transaction: 1,
		expired_at: date
	},
	{
		user_id: 1,
		movie_id: 4,
		status: 1,
		amount: 205,
		transaction: 1,
		expired_at: date
	}
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('rents', rents, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('rents', null, {});
		
	}
};
