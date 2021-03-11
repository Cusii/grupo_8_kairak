'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE movies_sales 
		ADD CONSTRAINT check_moviessales_discount
		CHECK (discount > 0 AND discount <= 100)`);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE movies_sales 
		DROP CHECK check_moviessales_discount`);
	}
};
