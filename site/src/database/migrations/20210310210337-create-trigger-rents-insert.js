'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`CREATE TRIGGER tr_rents_insert_rentedmovies 
		AFTER INSERT ON rents
		FOR EACH ROW
		UPDATE rented_movies
			SET counter = counter + 1,
				updated_at = NEW.rented_at
			WHERE movie_id = NEW.movie_id;`
		);
		await queryInterface.sequelize.query(`CREATE TRIGGER tr_rents_insert_ratingsmoviesusers 
		AFTER INSERT ON rents
		FOR EACH ROW
		INSERT INTO ratings_movies_users (movie_id, user_id, rent_id, rating)
			VALUES (NEW.movie_id, NEW.user_id, NEW.rent_id, 0);`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`DROP TRIGGER tr_rents_insert_rentedmovies`);
		await queryInterface.sequelize.query(`DROP TRIGGER tr_rents_insert_ratingsmoviesusers`);
	}
};
