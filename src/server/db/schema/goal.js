
import Sequelize from 'sequelize';
import db from '../index';

import Task from './task';
import Entry from './entry';

const Goal = db.define('goal', {
  text: { type: Sequelize.TEXT, allowNull: false },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false }
}, {
  paranoid: true
});

Goal.hasMany(Task);
Goal.hasMany(Entry);

export default Goal;
