'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE ratings_movies_users 
		ADD CONSTRAINT check_ratingsmoviesusers_ranking
		CHECK (rating >= 0 AND rating <=5)`);		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE ratings_movies_users 
		DROP CONSTRAINT check_ratingsmoviesusers_ranking`);
	}
};
