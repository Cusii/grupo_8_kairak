'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('directors', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			first_name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			last_name: {
				allowNull: false,
				type: Sequelize.STRING
			}
		});
		await queryInterface.addConstraint('directors', {
			fields: ['first_name','last_name'],
			type: 'unique',
			name: 'uk_directors_name'
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('directors');
		await queryInterface.removeConstraint('directors', 'uk_directors_name');
	}
};