'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE rankings_movies_users 
		ADD CONSTRAINT check_rankingsmoviesusers_ranking
		CHECK (ranking >= 1 AND ranking <=5)`);		
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE rankings_movies_users 
		DROP CHECK check_rankingsmoviesusers_ranking`);
	}
};
