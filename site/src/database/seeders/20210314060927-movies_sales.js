'use strict';

function addDays(date, days) {
	const newDate = new Date(Number(date))
	newDate.setDate(date.getDate() + days)
	return newDate;
}

const movies_sales = [
	{
		movie_id: 1,
		discount: 25,
		status: 1,
		created_at: new Date(),
		expired_at: addDays(new Date(), 20)
	},
	{
		movie_id: 8,
		discount: 45,
		status: 1,
		created_at: new Date(),
		expired_at: addDays(new Date(), 30)
	},
	{
		movie_id: 4,
		discount: 32,
		status: 1,
		created_at: new Date(),
		expired_at: addDays(new Date(), 35)
	}
	
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('movies_sales', movies_sales, {});
		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('movies_sales', null, {});
		
	}
};
