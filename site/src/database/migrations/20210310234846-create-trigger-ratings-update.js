'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
	await queryInterface.sequelize.query(`CREATE TRIGGER tr_ratings_update BEFORE UPDATE ON ratings
	FOR EACH ROW
	BEGIN
	  IF NEW.accumulated_rating <> OLD.accumulated_rating THEN
		  SET NEW.avg_rating = (NEW.accumulated_rating / NEW.total_votes) ;
	  END IF;
	END;`
	);
  },

  down: async (queryInterface, Sequelize) => {
	await queryInterface.sequelize.query(`DROP TRIGGER tr_ratings_update `);
  }
};
