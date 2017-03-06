'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var logger = _interopDefault(require('koa-logger'));
var serve = _interopDefault(require('koa-static'));
var compress = _interopDefault(require('koa-compress'));
var Router = _interopDefault(require('koa-router'));
var mount = _interopDefault(require('koa-mount'));
var hbs = _interopDefault(require('koa-hbs'));
var session = _interopDefault(require('koa-session'));
var passport = _interopDefault(require('koa-passport'));
var KoaBody = _interopDefault(require('koa-body'));
var Sequelize = _interopDefault(require('sequelize'));
var fs = _interopDefault(require('fs'));
var crypto = _interopDefault(require('crypto'));
var passportLocal = require('passport-local');
var ramda = require('ramda');

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
const CONFIG = {};
function mergeConfig(confs) {
  confs.forEach(conf => {
    for (const x in conf) {
      if (conf.hasOwnProperty(x) && conf[x] !== undefined) { // ignore undefined
        CONFIG[x] = conf[x];
      }
    }
  });
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

const Task = db.define('task', {
  text: { type: Sequelize.STRING, allowNull: false },
  notes: { type: Sequelize.TEXT },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false }
}, {
  paranoid: true
});

const Entry = db.define('entry', {
  text: { type: Sequelize.TEXT, allowNull: false }
}, {
  paranoid: true
});

const Goal = db.define('goal', {
  text: { type: Sequelize.TEXT, allowNull: false },
  orderIndex: { type: Sequelize.INTEGER, allowNull: false }
}, {
  paranoid: true
});

Goal.hasMany(Task);
Goal.hasMany(Entry);

function setPassword(password) {
  return new Promise((res, rej) => {   
    if (!password) {
      return rej(new Error('Missing password'));
    }
    crypto.randomBytes(CRYPTO_OPTIONS.saltlen, (err, buf) => {
      if (err) { return rej(err); }

      var salt = buf.toString('hex');

      crypto.pbkdf2(password, salt, CRYPTO_OPTIONS.iterations, CRYPTO_OPTIONS.keylen, (err, hashRaw) => {
        if (err) { return rej(err); }

        this.set('hash', new Buffer(hashRaw, 'binary').toString('hex'));
        this.set('salt', salt);

        res(this);
      });
    });
  });
}

function authenticate(password) {
  return new Promise((res, rej) => {
    if (!this.get('salt')) {
      return rej(new Error('Missing salt'));
    }
    crypto.pbkdf2(password, this.get('salt'), CRYPTO_OPTIONS.iterations, CRYPTO_OPTIONS.keylen, (err, hashRaw) => {
      if (err) { return rej(err); }
      var hash = new Buffer(hashRaw, 'binary').toString('hex');
      if (hash === this.get('hash')) {
        return res(this);
      } else {
        return rej(new Error('no good'));
      }
    });
  });
}

function serialize() {
  const user = this.get({ plain: true });
  delete user.hash;
  delete user.salt;
  return user;
}

const User = db.define('user', {
  username: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  hash: { type: Sequelize.TEXT, allowNull: false },
  salt: { type: Sequelize.STRING, allowNull: false }
}, {
  paranoid: true,
  instanceMethods: {
    setPassword,    
    serialize,
    authenticate
  }
});

const CRYPTO_OPTIONS = {
  saltlen:  32,
  iterations: 12000,
  keylen:  512
};

User.hasMany(Task);
User.hasMany(Entry);
User.hasMany(Goal);

function* reorder(db, Schema, body, updating, userId) {
  const table = Schema.getTableName();
  // first set the one we're updating to 0 to get it out of the way
  yield Schema.update({ orderIndex: 0 }, { where: { id: body.id } });
  // down in order
  if (body.orderIndex > updating.orderIndex) {
    // everything above the old order index and below the new order index decreases one
    yield db.query(`
      UPDATE ${table} 
      SET "orderIndex" = ("orderIndex" - 1) 
      WHERE "orderIndex" > ${updating.orderIndex} 
        AND "orderIndex" <= ${body.orderIndex} 
        AND "userId" = ${userId}
        AND "deletedAt" IS NULL
    `);  
  } else if (body.orderIndex < updating.orderIndex) {
    // everything above the old order index and below the new order index increases one
    console.log(body.orderIndex, updating.orderIndex);
    yield db.query(`
      UPDATE ${table} 
      SET "orderIndex" = ("orderIndex" + 1) 
      WHERE "orderIndex" >= ${body.orderIndex} 
        AND "orderIndex" < ${updating.orderIndex} 
        AND "userId" = ${userId}
        AND "deletedAt" IS NULL
    `);
  }
}

function* decOrderIndexAbove(db, table, idx, userId) {
  yield db.query(`
    UPDATE ${table} 
    SET "orderIndex" = ("orderIndex" - 1) 
      WHERE "orderIndex" > ${idx}
        AND "userId" = ${userId}
        AND "deletedAt" IS NULL
  `);
}

function* incOrderIndexAbove(db, table, idx, userId) {
  yield db.query(`
    UPDATE ${table} 
    SET "orderIndex" = ("orderIndex" + 1)
      WHERE "orderIndex" > ${idx}
        AND "userId" = ${userId}
        AND "deletedAt" IS NULL
  `);
}

function getSessionedUser(ctx) {
  const user = ramda.path(['session', 'passport', 'user'])(ctx);
  if (!user) { throw new Error('missing user'); }
  return user;
}

var userProvider = {
  create: function*(body) {
    const { username, email, password } = body;
    const user = User.build({
      username,
      email
    });
    yield user.setPassword(password);
    return user.save();
  }
  // update: function*(body) {
  //   yield User.upsert(body);
  //   // upsert doesn't return the updated record
  //   return User.findById(body.id).serialize();
  // },
  // get: function*(id) {
  //   return User.findById(id).serialize();
  // },
  // remove: function*(id) {
  //   yield User.destroy({ where: { id }})
  //   return;
  // }
};

// setup passport
passport.use(new passportLocal.Strategy(function(username, password, done) {
  User.findOne({ where: { username }}).then(user => {
    user.authenticate(password).then(user => {
      done(null, user.serialize());
    }).catch(err => {
      done(null, false);
    });
  }).catch(console.error);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const app$2 = new Koa();
const router$1 = Router();
const koaBody = KoaBody();

// login / logout endpoints
router$1.post('/login', koaBody, function*() {
  const login = this.req.login;
  const self = this;
  const handleError = (e) => {
    this.status = 500; 
    this.body = e.message || e;
  };

  yield passport.authenticate('local', {
  }, function*(err, user, info, status) {
    if (err) return handleError(err);
    if (!user) {
      self.status = 403;
      return;
    }
    login(user, (er) => {
      if (er) return handleError(er);
      self.body = user;
      self.status = 200;
    });
  });
});

router$1.post('/register', koaBody, function*() {
  try {
    const {
      username,
      email,
      password1
    } = this.request.body;
    const user = yield userProvider.create({
      password: password1,
      username,
      email
    });
    this.body = user.serialize();
    this.status = 201;
  } catch (err) {
    this.status = 400;
    this.body = err;
  }
});

app$2.use(router$1.routes());

var goalProvider = {
  create: function*(body, ctx) {
    const userId = getSessionedUser(ctx).id;
    yield incOrderIndexAbove(db, Goal.getTableName(), 0, userId);
    return Goal.create(Object.assign({}, body, { 
      orderIndex: 1,
      userId
    }));
  },
  update: function*(body, ctx) {
    // look up item to be updated
    const updating = yield Goal.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      yield reorder(db, Goal, body, updating, getSessionedUser(ctx).id);
    }
    // TODO: need to check that the userId matches that of the session
    // and that the goal is owned by that userId
    yield Goal.upsert(body);
    // upsert doesn't return the updated record
    return Goal.findById(body.id);
  },
  get: function*(query, ctx) {
    return Goal.findAll({
      order: ['orderIndex'],
      where: { userId: getSessionedUser(ctx).id }
    });
  },
  remove: function*(id, ctx) {
    const goal = yield Goal.findById(id);
    const userId =  getSessionedUser(ctx).id;
    const removingOrderIndex = goal.orderIndex;
    yield Goal.destroy({ 
      where: { 
        userId,
        id 
      }
    });
    yield decOrderIndexAbove(
      db, 
      Goal.getTableName(), 
      removingOrderIndex, 
      userId      
    );
  }
};

var taskProvider = {
  create: function*(body, ctx) {
    const userId = getSessionedUser(ctx).id;
    yield incOrderIndexAbove(db, Task.getTableName(), 0, userId);
    return Task.create(Object.assign({}, body, { 
      orderIndex: 1,
      userId  
    }));
  },
  update: function*(body, ctx) {
    // look up item to be updated
    const updating = yield Task.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      yield reorder(db, Task, body, updating, getSessionedUser(ctx).id);
    }
    // TODO: need to check that the userId matches that of the session
    // and that the goal is owned by that userId
    yield Task.upsert(body);
    // upsert doesn't return the updated record
    return Task.findById(body.id);
  },
  get: function*(query, ctx) {
    return Task.findAll({
      order: ['orderIndex'],
      where: { userId: getSessionedUser(ctx).id }
    });
  },
  remove: function*(id, ctx) {
    const task = yield Task.findById(id);
    const userId = getSessionedUser(ctx).id;
    const removingOrderIndex = task.orderIndex;
    yield Task.destroy({ where: { 
      userId,
      id
    }});
    yield decOrderIndexAbove(
      db, 
      Task.getTableName(), 
      removingOrderIndex, 
      userId
    );
  }
};

var entryProvider = {
  create: function*(body, ctx) {
    return Entry.create(Object.assign({}, body, {
      userId: getSessionedUser(ctx).id
    }));
  },
  update: function*(body) {
    // TODO: need to check that the userId matches that of the session
    // and that the goal is owned by that userId
    return Entry.upsert(body);
  },
  get: function*(query, ctx) {
    return Entry.findAll({
      where: { 
        userId: getSessionedUser(ctx).id 
      }
    });
  },
  remove: function*(id) {
    return Entry.destroy({ where: {
      userId: getSessionedUser(ctx).id,
      id 
    }});
  }
};

const app$3 = new Koa();
const router$2 = Router();
const koaBody$1 = KoaBody();

restify(goalProvider, 'goals');
restify(taskProvider, 'tasks');
restify(entryProvider, 'entries');

function handleError(ctx, err) {
  ctx.status = 400;
  ctx.body = { message: err.stack || err };
}

function restify(provider, path$$1) {
  router$2.get(`/${path$$1}`, function*(){
    try {
      const response = yield provider.get(this.query, this);
      this.status = 200;
      this.body = response;
    } catch (err) { handleError(this, err); }
  });
  router$2.post(`/${path$$1}`, koaBody$1, function*() {
    try {
      const body = this.request.body;
      const created = yield provider.create(body, this);
      this.status = 201;
      this.body = created;
    } catch (err) { handleError(this, err); }
  });
  router$2.put(`/${path$$1}`, koaBody$1, function*() {
    try {
      const body = this.request.body;
      const updated = yield provider.update(body, this);
      this.status = 200;
      this.body = updated;
    } catch (err) { handleError(this, err); }
  });
  router$2.delete(`/${path$$1}/:id`, function*() {
    try {
      yield provider.remove(this.params.id, this);
      this.status = 204;
    } catch (err) { handleError(this, err); }
  });
}

app$3.use(router$2.routes());

const PORT = process.env.NODE_PORT || 5000;
const IP = process.env.NODE_IP || 'localhost';

const VIEW_PATH = `${__dirname}/../../views`;
const DEV_CLIENT_PATH = `${__dirname}/../client/dev`;
const PROD_CLIENT_PATH = `${__dirname}/../client/prod`;
const STATIC_PATH = `${__dirname}/../../public`;

const SESSION_KEYS = ['your-session-secret', 'another-session-secret'];


const router = Router();
const app = new Koa();
app.keys = SESSION_KEYS;
const SESSION_CONFIG = {
  key: 'mf:sesh', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};
app.use(session(SESSION_CONFIG, app));

// authentication
app.use(passport.initialize());
app.use(passport.session());


app.use(compress());
app.use(hbs.middleware({
  extname:".hbs",
  defaultLayout: 'index',
  layoutsPath: VIEW_PATH,
  viewPath: VIEW_PATH
}));


// only log requests that make it past static dirs
app.use(logger());

// support openshift health check
router.get('/health', function*(){
  this.status = 200;
  this.body = { status: 'up' };
});

app.use(mount('/identity', app$2));

// Require authentication for now
app.use(function*(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    yield this.render('login', {
      title: 'Myndfull Login',
      loginEndpoint: '/identity/login',
      registerEndpoint: '/identity/register'
    });
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(serve(DEV_CLIENT_PATH));
} else {
  app.use(serve(PROD_CLIENT_PATH));
}
app.use(serve(STATIC_PATH));

app.use(mount('/api', app$3));

router.get('/*', function*() {
  yield this.render('home', {
    title: 'Myndfull'
  });
});

app.use(router.routes());

process.on('uncaughtException', function(err) {
  console.error(err.stack);
});

app.listen(PORT, IP);
console.info(`listening on port ${IP}:${PORT}`);

module.exports = app;
