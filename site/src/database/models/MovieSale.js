'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MovieSale extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			MovieSale.belongsTo(models.Movie,{
				as: 'movie',
				foreignKey: 'movieId'
			})
		}
	};
	MovieSale.init({
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
		discount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		expiredAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'MovieSale',
		tableName: "movies_sales",
		underscored: true
	});
	return MovieSale;
};