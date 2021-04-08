'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE ratings 
		ADD CONSTRAINT check_ratings_accumulatedrating
		CHECK (accumulated_rating >= 0)`);
		await queryInterface.sequelize.query(`ALTER TABLE ratings 
		ADD CONSTRAINT check_ratings_totalvotes
		CHECK (total_votes >= 0)`);
		await queryInterface.sequelize.query(`ALTER TABLE ratings 
		ADD CONSTRAINT check_ratings_avgrating
		CHECK (avg_rating >= 0 AND avg_rating <= 5)`);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE ratings 
		DROP CONSTRAINT check_ratings_accumulatedrating`);
		await queryInterface.sequelize.query(`ALTER TABLE ratings 
		DROP CONSTRAINT check_ratings_totalvotes`);
		await queryInterface.sequelize.query(`ALTER TABLE ratings 
		DROP CONSTRAINT check_ratings_avgrating`);
	}
};
