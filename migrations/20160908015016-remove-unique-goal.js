
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'goals',
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
      'goals',
      'orderIndex',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      }
    )
  }
};
