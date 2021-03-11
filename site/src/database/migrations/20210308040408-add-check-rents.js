'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE rents 
		ADD CONSTRAINT check_rents_amount
		CHECK (amount >= 0)`);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE rents 
		DROP CHECK check_rents_amount`);
	}
};
