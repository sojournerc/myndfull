'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'entries',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        defaultValue: 1
      }
    );
    queryInterface.addColumn(
      'goals',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        defaultValue: 1
      }
    );
    queryInterface.addColumn(
      'tasks',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        defaultValue: 1
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'entries',
      'userId'
    );
    queryInterface.removeColumn(
      'goals',
      'userId'
    );
    queryInterface.removeColumn(
      'tasks',
      'userId'
    )
  }
};
