'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var logger = _interopDefault(require('koa-logger'));
var serve = _interopDefault(require('koa-static'));
var compress = _interopDefault(require('koa-compress'));
var Router = _interopDefault(require('koa-router'));
var mount = _interopDefault(require('koa-mount'));
var hbs = _interopDefault(require('koa-hbs'));
var KoaBody = _interopDefault(require('koa-body'));
var Sequelize = _interopDefault(require('sequelize'));
var fs = _interopDefault(require('fs'));

// reading these from the file system b/c we don't want to include any configuratin in the rolled up bundle
const DEFAULT = JSON.parse(fs.readFileSync(`${process.cwd()}/config.default.json`));

let CUSTOM = {};
try {
  CUSTOM = JSON.parse(fs.readFileSync(`${process.cwd()}/config.custom.json`));
} catch (e) { console.warn('No custom configuration found'); }

const OPEN_SHIFT = {
  dbUser: process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME,
  dbPassword: process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD,
  dbHost: process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
  dbPort: process.env.OPENSHIFT_POSTGRESQL_DB_PORT
};

// can't use Object assign b/c the above environment variables will be undefined and will
// clobber the default / custom values
const CONFIG = {}
function mergeConfig(confs) {
  confs.forEach(conf => {
    for (const x in conf) {
      if (conf.hasOwnProperty(x) && conf[x] !== undefined) { // ignore undefined
        CONFIG[x] = conf[x];
      }
    }
  })
}
mergeConfig([DEFAULT, CUSTOM, OPEN_SHIFT]);

function getDBConnectionString() {
  return `postgres://${CONFIG.dbUser}:${CONFIG.dbPassword}@${CONFIG.dbHost}:${CONFIG.dbPort}/${CONFIG.dbName}`
}

module.exports = CONFIG;

const dbConnectString = getDBConnectionString();

const db = new Sequelize(dbConnectString, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const Goal = db.define('goal', {
  text: { type: Sequelize.TEXT, allowNull: false },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false, unique: true }
}, {

});

const Task = db.define('task', {
  text: { type: Sequelize.TEXT, allowNull: false },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false, unique: true }
}, {

});

const Entry = db.define('entry', {
  text: { type: Sequelize.TEXT, allowNull: false }
}, {

});

const app$1 = new Koa();
const router$1 = Router()
const koaBody = KoaBody();

restify(Goal, 'goals');
restify(Task, 'tasks');
restify(Entry, 'entries');

function handleError(ctx, err) {
  ctx.status = 400;
  ctx.body = err.stack || err;
}

function restify(Model, path) {
  router$1.get(`/${path}`, function*(){
    try {
      const response = yield Model.findAll();
      this.status = 200;
      this.body = response;
    } catch (err) { handleError(this, err); }
  });
  router$1.post(`/${path}`, koaBody, function*() {
    try {
      const body = this.request.body;
      const created = yield Model.create(body);
      this.status = 201;
      this.body = created;
    } catch (err) { handleError(this, err); }
  });
  router$1.put(`/${path}`, koaBody, function*() {
    try {
      const body = this.request.body;
      yield Model.upsert(body);
      // TODO: if the DB moves off SQLite this can be removed as the upsert will return the row instead
      const updated = yield Model.findOne({
        where: {
          id: body.id
        }
      })
      this.status = 200;
      this.body = updated;
    } catch (err) { handleError(err) }
  });
  router$1.delete(`/${path}/:id`, koaBody, function*() {
    try {
      yield Model.destroy({
        where: {
          id: this.params.id
        }
      });
      this.status = 204;
    } catch (err) { handleError(err); }
  });
}

app$1.use(router$1.routes());

const PORT = process.env.NODE_PORT || 5000;
const IP = process.env.NODE_IP || 'localhost';

const VIEW_PATH = `${__dirname}/../../views`;
const DEV_CLIENT_PATH = `${__dirname}/../client/dev`;
const PROD_CLIENT_PATH = `${__dirname}/../client/prod`;
const STATIC_PATH = `${__dirname}/../../public`;

const router = Router();
const app = new Koa();
app.use(compress())

app.use(hbs.middleware({
  extname:".hbs",
  defaultLayout: 'index',
  layoutsPath: VIEW_PATH,
  viewPath: VIEW_PATH
}));

if (process.env.NODE_ENV === 'development') {
  app.use(serve(DEV_CLIENT_PATH));
} else {
  app.use(serve(PROD_CLIENT_PATH));
}
app.use(serve(STATIC_PATH));

// only log requests that make it past static dirs
app.use(logger());

app.use(mount('/api', app$1));

// support openshift health check
router.get('/health', function*(){
  this.status = 200;
  this.body = { status: 'up' };
});

router.get('/', function*() {
  yield this.render('home', {
    title: 'Myndfull'
  });
});

app.use(router.routes());

process.on('uncaughtException', function(err) {
  console.error(err.stack);
});

app.listen(PORT, IP)
console.info(`listening on port ${IP}:${PORT}`);

module.exports = app;