'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'tasks',
      'text',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'tasks',
      'text',
      {
        type: Sequelize.TEXT,
        allowNull: false
      }
    )
  }
};
