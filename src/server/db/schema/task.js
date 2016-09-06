
import Sequelize from 'sequelize';
import db from '../index';

const Task = db.define('task', {
  text: { type: Sequelize.TEXT, allowNull: false },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false, unique: true }
}, {

});

Task.sync({ force: true });
export default Task;
