
import Sequelize from 'sequelize';
import db from '../index';

const Task = db.define('task', {
  text: { type: Sequelize.STRING, allowNull: false },
  notes: { type: Sequelize.TEXT },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false }
}, {
  paranoid: true
});

export default Task;
