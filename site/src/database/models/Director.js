'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Director extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Director.belongsToMany(models.Movie, {
				as: 'movies',
				through: 'moviesDirectors',
				foreignKey: 'directorId',
				otherKey: 'movieId',
				timestamps: true
			})
		}
	};
	Director.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		firstName: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: 'ukDirectorsName'
		},
		lastName: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: 'ukDirectorsName'	
		}
	}, {
		sequelize,
		modelName: 'Director',
		underscored: true,
		timestamps: false
	});
	return Director;
};