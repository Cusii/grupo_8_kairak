'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`CREATE EVENT e_update_sales
		ON SCHEDULE EVERY 1 DAY STARTS '2021-04-07 00:00:01'
		DO UPDATE movies_sales SET status = 0
		WHERE expired_at < now();`);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`DROP EVENT e_update_sales`);
	}
};
