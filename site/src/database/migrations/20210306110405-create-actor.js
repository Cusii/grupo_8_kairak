'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('actors', {
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
		await queryInterface.addConstraint('actors', {
			fields: ['first_name','last_name'],
			type: 'unique',
			name: 'uk_actors_name'
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('actors');
		await queryInterface.removeConstraint('actors', 'uk_actors_name');
	}
};