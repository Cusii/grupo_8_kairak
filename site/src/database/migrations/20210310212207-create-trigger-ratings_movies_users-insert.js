'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`CREATE TRIGGER tr_ratingsmoviesusers_insert 
		AFTER INSERT ON ratings_movies_users
		FOR EACH ROW
		UPDATE ratings
			SET accumulated_rating = accumulated_rating + NEW.rating,
				total_votes = total_votes + 1,
                updated_at = NEW.created_at
			WHERE movie_id = NEW.movie_id;`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`DROP TRIGGER tr_ratingsmoviesusers_insert`
		);
	}
};
