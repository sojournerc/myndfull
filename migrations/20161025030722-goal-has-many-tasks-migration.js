  'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tasks',
      'goalId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'goals', key: 'id' }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'tasks',
      'goalId'
    )
  }
};
