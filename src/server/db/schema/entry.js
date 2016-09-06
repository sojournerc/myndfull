
import Sequelize from 'sequelize';
import db from '../index';

const Entry = db.define('entry', {
  text: { type: Sequelize.TEXT, allowNull: false }
}, {

});

Entry.sync({ force: true });
export default Entry;
