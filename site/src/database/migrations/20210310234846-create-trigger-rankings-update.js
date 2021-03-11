'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
	await queryInterface.sequelize.query(`CREATE TRIGGER tr_rankings_update BEFORE UPDATE ON rankings
	FOR EACH ROW
	BEGIN
	  IF NEW.accumulated_ranking <> OLD.accumulated_ranking THEN
		  SET NEW.avg_ranking = (NEW.accumulated_ranking / NEW.total_votes) ;
	  END IF;
	END;`
	);
  },

  down: async (queryInterface, Sequelize) => {
	await queryInterface.sequelize.query(`DROP TRIGGER tr_rankings_update `);
  }
};
