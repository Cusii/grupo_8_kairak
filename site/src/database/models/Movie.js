'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Movie extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Movie.belongsTo(models.Genre, {
				as: 'genre',
				foreignKey: 'genreId'
			});

			Movie.belongsTo(models.Category, {
				as: 'category',
				foreignKey: 'categoryId'
			});

			Movie.hasOne(models.Rating, {
				as: 'rating',
				foreignKey: 'movieId'
			});

			Movie.hasMany(models.MovieSale, {
				as: 'sales',
				foreignKey: 'movieId'
			});

			Movie.hasOne(models.RentedMovie, {
				as: 'rented',
				foreignKey: 'movieId'
			});

			Movie.hasMany(models.Rent, {
				as: 'rents',
				foreignKey: 'movieId'
			});

			Movie.hasMany(models.RatingMovieUser, {
				as: 'ratingsByUser',
				foreignKey: 'movieId'
			});

			Movie.belongsToMany(models.Actor, {
				as: 'actors',
				through: 'moviesActors',
				foreignKey: 'movieId',
				otherKey: 'actorId',
				timestamps: true
			});

			Movie.belongsToMany(models.Director, {
				as: 'directors',
				through: 'moviesDirectors',
				foreignKey: 'movieId',
				otherKey: 'directorId',
				timestamps: true
			});
		}
	};
	Movie.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true			
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING		
		},
		price: {
			type: DataTypes.DECIMAL(7,2),
			allowNull: false
		},
		year: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		length: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		image: {
			allowNull: false,
			type: DataTypes.STRING		
		},
		trailerPath: {
			allowNull: false,
			type: DataTypes.STRING		
		},
		moviePath: {
			allowNull: false,
			type: DataTypes.STRING		
		},
		genreId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		categoryId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'Movie',
		underscored: true
	});
	return Movie;
};