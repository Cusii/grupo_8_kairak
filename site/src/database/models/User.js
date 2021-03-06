'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Role,{
				as: 'role',
				foreignKey: 'roleId'
			});

			User.hasMany(models.Rent, {
				as: 'rents',
				foreignKey: 'userId'
			});

			User.hasMany(models.RatingMovieUser, {
				as: 'ratingsByRent',
				foreignKey: 'userId'
			});

			User.hasOne(models.TmpResetPass, {
				as: 'resetPass',
				foreignKey: 'userId'
			})
			
		}
	};
	User.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: false
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'User',
		underscored: true
	});
	return User;
};