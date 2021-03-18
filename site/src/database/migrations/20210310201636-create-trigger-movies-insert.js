'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`CREATE TRIGGER tr_movies_insert 
		AFTER INSERT ON movies
		FOR EACH ROW
		BEGIN
			INSERT INTO ratings
				SET movie_id = NEW.id,
					accumulated_rating = 0,
					total_votes = 0,
					avg_rating = 0,
					created_at = now() ;
			INSERT INTO rented_movies
				SET movie_id = NEW.id,
					counter = 0,
					created_at = now() ;
		END;`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`DROP TRIGGER tr_movies_insert`);
	}
};
