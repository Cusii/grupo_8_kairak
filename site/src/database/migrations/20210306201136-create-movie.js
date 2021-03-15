'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('movies', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			price: {
				allowNull: false,
				type: Sequelize.DECIMAL(7,2)
			},
			year: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			length: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			image: {
				allowNull: false,
				type: Sequelize.STRING
			},
			trailer_path: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			movie_path: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			genre_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			category_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			status: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
		await queryInterface.addConstraint('movies', {
			fields: ['genre_id'],
			type: 'foreign key',
			name: 'fk_movies_genres_genre',
			references: {
			  	table: 'genres',
			  	field: 'id'
			}
		});
		await queryInterface.addConstraint('movies', {
			fields: ['category_id'],
			type: 'foreign key',
			name: 'fk_movies_categories_category',
			references: {
			  	table: 'categories',
			  	field: 'id'
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('movies');
		await queryInterface.removeConstraint('movies', 'fk_movies_genres_genre');
		await queryInterface.removeConstraint('movies', 'fk_movies_categories_category');
	}
};