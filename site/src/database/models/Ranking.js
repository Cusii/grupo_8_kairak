'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Ranking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Ranking.belongsTo(models.Movie,{
				as: 'movie',
				foreignKey: 'movieId'
			})
		}
	};
	Ranking.init({
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
		accumulatedRanking: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		totalVote: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		avgRanking: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'Ranking',
		underscored: true
	});
	return Ranking;
};