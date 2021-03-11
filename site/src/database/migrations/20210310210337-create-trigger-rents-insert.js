'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`CREATE TRIGGER tr_rents_insert 
		AFTER INSERT ON rents
		FOR EACH ROW
		UPDATE rented_movies
			SET counter = counter + 1,
				updated_at = NEW.rented_at
			WHERE movie_id = NEW.movie_id;`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`DROP TRIGGER tr_rents_insert`);
	}
};
