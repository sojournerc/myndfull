
import Sequelize from 'sequelize';
import db from '../index';

const Goal = db.define('goal', {
  text: { type: Sequelize.TEXT, allowNull: false },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false, unique: true }
}, {

});
Goal.sync();
export default Goal;
