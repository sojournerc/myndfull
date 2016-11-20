'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'entries',
      'goalId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'goals', key: 'id' }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'entries',
      'goalId'
    )
  }
};
