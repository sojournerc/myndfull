
import Sequelize from 'sequelize';

const db = new Sequelize('myndmap', 'user', 'pass', {
  dialect: 'sqlite',
  storage: `${__dirname}/../../database.sqlite`
});

export const models = db.models;

export default db;
