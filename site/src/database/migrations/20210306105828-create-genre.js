'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('genres', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('genres');
	}
};