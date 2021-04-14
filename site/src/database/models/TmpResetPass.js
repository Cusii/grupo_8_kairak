'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TmpResetPass extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			TmpResetPass.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'userId'
			})
		}
	};
	TmpResetPass.init({
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
		token: {
			allowNull: false,
			type: DataTypes.STRING		
		},
		expirationDate: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'TmpResetPass',
		tableName: 'tmp_reset_pass',
		underscored: true,
		timestamps: false
	});
	return TmpResetPass;
};