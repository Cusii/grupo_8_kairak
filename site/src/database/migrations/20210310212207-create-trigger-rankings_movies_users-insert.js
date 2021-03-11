'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`CREATE TRIGGER tr_rankingsmoviesusers_insert 
		AFTER INSERT ON rankings_movies_users
		FOR EACH ROW
		UPDATE rankings
			SET accumulated_ranking = accumulated_ranking + NEW.ranking,
				total_votes = total_votes + 1,
                updated_at = NEW.created_at
			WHERE movie_id = NEW.movie_id;`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`DROP TRIGGER tr_rankingsmoviesusers_insert`
		);
	}
};
