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

db.sync();

const Goal = db.define('goal', {
  text: { type: Sequelize.TEXT, allowNull: false },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false }
}, {

});

function* reorder(db, Schema, body, updating) {
  const table = Schema.getTableName();
  // first set the one we're updating to 0 to get it out of the way
  yield Schema.update({ orderIndex: 0 }, { where: { id: body.id } });
  // down in order
  if (body.orderIndex > updating.orderIndex) {
    // everything above the old order index and below the new order index decreases one
    yield db.query(`UPDATE ${table} SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${updating.orderIndex} AND "orderIndex" <= ${body.orderIndex}`);
  // up in order
  } else if (body.orderIndex < updating.orderIndex) {
    // everything above the old order index and below the new order index increases one
    yield db.query(`UPDATE ${table} SET "orderIndex" = ("orderIndex" + 1) WHERE "orderIndex" >= ${body.orderIndex} AND "orderIndex" < ${updating.orderIndex}`);
  }
}

var goalProvider = {
  create: function*(body) {
    // add the new goal to the top of the list
    yield db.query(`UPDATE goals SET "orderIndex" = ("orderIndex" + 1)`);
    return Goal.create(Object.assign({}, body, { orderIndex: 1 }));
  },
  update: function*(body) {
    // look up item to be updated
    const updating = yield Goal.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      yield reorder(db, Goal, body, updating);
    }
    yield Goal.upsert(body);
    // upsert doesn't return the updated record
    return Goal.findById(body.id);
  },
  get: function*(query) {
    return Goal.findAll({
      order: ['orderIndex']
    });
  },
  remove: function*(id) {
    const goal = yield Goal.findById(id);
    const removingOrderIndex = goal.orderIndex;
    // destroy the item
    yield Goal.destroy({ where: { id }})
    // update the other rows to have correct orderIdx
    yield db.query(`UPDATE goals SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${removingOrderIndex}`);
    return;
  }
}

const Task = db.define('task', {
  text: { type: Sequelize.STRING, allowNull: false },
  notes: { type: Sequelize.TEXT },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false }
}, {

});

var taskProvider = {
  create: function*(body) {
    // add the new task to the top of the list
    yield db.query(`UPDATE tasks SET "orderIndex" = ("orderIndex" + 1)`);
    return Task.create(Object.assign({}, body, { orderIndex: 1 }));
  },
  update: function*(body) {
    // look up item to be updated
    const updating = yield Task.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      yield reorder(db, Task, body, updating);
    }
    yield Task.upsert(body);
    // upsert doesn't return the updated record
    return Task.findById(body.id);
  },
  get: function*(query) {
    return Task.findAll({
      order: ['orderIndex']
    });
  },
  remove: function*(id) {
    const task = yield Task.findById(id);
    const removingOrderIndex = task.orderIndex;
    // destroy the item
    yield Task.destroy({ where: { id }})
    // update the other rows to have correct orderIdx
    yield db.query(`UPDATE tasks SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${removingOrderIndex}`);
    return;
  }
}

const Entry = db.define('entry', {
  text: { type: Sequelize.TEXT, allowNull: false }
}, {

});

var entryProvider = {
  create: function*(body) {
    return Entry.create(body);
  },
  update: function*(body) {
    return Entry.upsert(body);
  },
  get: function*(query) {
    return Entry.findAll({
    });
  },
  remove: function*(id) {
    return Entry.destroy({ where: { id }});
  }
}

const app$2 = new Koa();
const router$1 = Router()
const koaBody = KoaBody();

restify(goalProvider, 'goals');
restify(taskProvider, 'tasks');
restify(entryProvider, 'entries');

function handleError(ctx, err) {
  ctx.status = 400;
  ctx.body = { message: err.stack || err };
}

function restify(provider, path) {
  router$1.get(`/${path}`, function*(){
    try {
      const response = yield provider.get(this.query);
      this.status = 200;
      this.body = response;
    } catch (err) { handleError(this, err); }
  });
  router$1.post(`/${path}`, koaBody, function*() {
    try {
      const body = this.request.body;
      const created = yield provider.create(body);
      this.status = 201;
      this.body = created;
    } catch (err) { handleError(this, err); }
  });
  router$1.put(`/${path}`, koaBody, function*() {
    try {
      const body = this.request.body;
      const updated = yield provider.update(body);
      this.status = 200;
      this.body = updated;
    } catch (err) { handleError(this, err) }
  });
  router$1.delete(`/${path}/:id`, function*() {
    try {
      yield provider.remove(this.params.id);
      this.status = 204;
    } catch (err) { handleError(this, err); }
  });
}

app$2.use(router$1.routes());

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

app.use(mount('/api', app$2));

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
