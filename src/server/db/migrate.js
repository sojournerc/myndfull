
import Umzug from 'umzug'; // https://github.com/sequelize/umzug
import db from './index';
import Sequelize from 'sequelize';

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: db,
    tableName: 'Migrations'
  },
  migrations: {
    // params that get passed to the migrations
    params: [db.getQueryInterface(), Sequelize],
  }
});

// SEE http://sequelize.readthedocs.io/en/latest/docs/migrations/
// migrations are in /myndfull/migrations/
console.log('RUNNING MIGRATIONS')
umzug.up().then(function (migrations) {
  migrations.forEach(mig => {
    console.log('RAN: ', mig.file);
  });
  console.log('MIGRATIONS COMPLETE')
});
