
import Sequelize from 'sequelize';
import { getDBConnectionString } from '../config';

const dbConnectString = getDBConnectionString();

const db = new Sequelize(dbConnectString, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

export const models = db.models;

export default db;
