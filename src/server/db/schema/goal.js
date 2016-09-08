
import Sequelize from 'sequelize';
import db from '../index';

const Goal = db.define('goal', {
  text: { type: Sequelize.TEXT, allowNull: false },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false }
}, {

});
export default Goal;
