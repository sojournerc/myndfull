'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'users',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: Sequelize.STRING, allowNull: false, unique: true },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        hash: { type: Sequelize.TEXT, allowNull: false },
        salt: { type: Sequelize.STRING, allowNull: false },
        createdAt: { type: Sequelize.DATE },
        updatedAt: { type: Sequelize.DATE },
        deletedAt: { type: Sequelize.DATE }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};
