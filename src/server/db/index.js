
import Sequelize from 'sequelize';
import { getDBConnectionString } from '../config';

const dbConnectString = getDBConnectionString();

const db = new Sequelize(dbConnectString, {
  dialect: 'postgres'
});

export const models = db.models;

export default db;
