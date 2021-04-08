'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE rented_movies 
		ADD CONSTRAINT check_rentedmovies_counter
		CHECK (counter >= 0)`);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE rented_movies 
		DROP CONSTRAINT check_rentedmovies_counter`);
	}
};
