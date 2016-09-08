
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'tasks',
      'orderIndex',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'tasks',
      'orderIndex',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      }
    )
  }
};
