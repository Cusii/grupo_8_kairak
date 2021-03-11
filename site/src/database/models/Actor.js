'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Actor extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here			
			Actor.belongsToMany(models.Movie, {
				as: 'movies',
				through: 'moviesActors',
				foreignKey: 'actorId',
				otherKey: 'movieId',
				timestamps: true
			})
		}
	};
	Actor.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		firstName: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: 'ukActorsName'
		},
		lastName: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: 'ukActorsName'	
		}
	}, {
		sequelize,
		modelName: 'Actor',
		underscored: true,
		timestamps: false
	});
	return Actor;
};