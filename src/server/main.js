
import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import compress from 'koa-compress';
import Router from 'koa-router';
import mount from 'koa-mount';
import hbs from 'koa-hbs';
import session from 'koa-session';
import passport from 'koa-passport';
import auth from './auth';

import api from './api/index';

const PORT = process.env.NODE_PORT || 5000;
const IP = process.env.NODE_IP || 'localhost';

const VIEW_PATH = `${__dirname}/../../views`;
const DEV_CLIENT_PATH = `${__dirname}/../client/dev`;
const PROD_CLIENT_PATH = `${__dirname}/../client/prod`;
const STATIC_PATH = `${__dirname}/../../public`;

const SESSION_KEYS = ['your-session-secret', 'another-session-secret']


const router = Router();
const app = new Koa();
export default app;

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
app.use(passport.initialize())
app.use(passport.session())


app.use(compress())
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

app.use(mount('/identity', auth));

// Require authentication for now
app.use(function*(next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    yield this.render('login', {
      title: 'Myndfull Login',
      endpoint: '/identity/login'
    });
  }
})

if (process.env.NODE_ENV === 'development') {
  app.use(serve(DEV_CLIENT_PATH));
} else {
  app.use(serve(PROD_CLIENT_PATH));
}
app.use(serve(STATIC_PATH));

app.use(mount('/api', api));

router.get('/*', function*() {
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
