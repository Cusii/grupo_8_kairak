'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE rankings 
		ADD CONSTRAINT check_rankings_accumulatedranking
		CHECK (accumulated_ranking >= 0)`);
		await queryInterface.sequelize.query(`ALTER TABLE rankings 
		ADD CONSTRAINT check_rankings_totalvotes
		CHECK (total_votes >= 0)`);
		await queryInterface.sequelize.query(`ALTER TABLE rankings 
		ADD CONSTRAINT check_rankings_avgranking
		CHECK (avg_ranking >= 0 AND avg_ranking <= 5)`);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE rankings 
		DROP CHECK check_rankings_accumulatedranking`);
		await queryInterface.sequelize.query(`ALTER TABLE rankings 
		DROP CHECK check_rankings_totalvotes`);
		await queryInterface.sequelize.query(`ALTER TABLE rankings 
		DROP CHECK check_rankings_avgranking`);
	}
};
