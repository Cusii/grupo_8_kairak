'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RatingMovieUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			RatingMovieUser.belongsTo(models.Movie, {
				as: 'movie',
				foreignKey: 'movieId'	
			});

			RatingMovieUser.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'userId'	
			});

			RatingMovieUser.belongsTo(models.Rent, {
				as: 'rent',
				foreignKey: 'rentId'	
			});
		}
	};
	RatingMovieUser.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		movieId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		rentId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		done: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'RatingMovieUser',
		tableName: 'ratings_movies_users',
		underscored: true
	});
	return RatingMovieUser;
};