'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`CREATE EVENT e_update_rented_movies
		ON SCHEDULE EVERY 1 HOUR STARTS '2021-04-07 00:00:00'
		DO UPDATE rents SET status = 0
		WHERE expired_at < now();`);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`DROP EVENT e_update_rented_movies`);
	}
};
