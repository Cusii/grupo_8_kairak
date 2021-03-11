'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Rent extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Rent.belongsTo(models.Movie, {
				as: 'movie',
				foreignKey: 'movieId'	
			});

			Rent.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'userId'	
			});
		}
	};
	Rent.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		movieId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		amount: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		transaction: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		expiredAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		rentedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'Rent',
		underscored: true,
		timestamps: false
	});
	return Rent;
};