'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE ratings_movies_users 
		ADD CONSTRAINT check_ratingsmoviesusers_ranking
		CHECK (rating >= 1 AND rating <=5)`);		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE ratings_movies_users 
		DROP CHECK check_ratingsmoviesusers_ranking`);
	}
};
