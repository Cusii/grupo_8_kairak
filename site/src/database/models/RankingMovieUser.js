'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RankingMovieUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			RankingMovieUser.belongsTo(models.Movie, {
				as: 'movie',
				foreignKey: 'movieId'	
			});

			RankingMovieUser.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'userId'	
			});
		}
	};
	RankingMovieUser.init({
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
		ranking: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'RankingMovieUser',
		tableName: 'rankings_movies_users',
		underscored: true
	});
	return RankingMovieUser;
};