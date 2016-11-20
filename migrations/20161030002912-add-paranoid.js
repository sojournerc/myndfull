'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    ['tasks', 'goals', 'entries'].forEach(it => {
      queryInterface.addColumn(
        it,
        'deletedAt',
        {
          type: Sequelize.DATE,
        }
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    ['tasks', 'goals', 'entries'].forEach(it => {
      queryInterface.removeColumn(
        it,
        'deletedAt'
      );
    })
  }
};
