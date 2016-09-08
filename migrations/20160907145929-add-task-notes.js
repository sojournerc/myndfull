
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('tasks', 'notes', Sequelize.TEXT);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('tasks', 'notes');
  }
};
