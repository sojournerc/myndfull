
import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import compress from 'koa-compress';
import Router from 'koa-router';
import mount from 'koa-mount';
import hbs from 'koa-hbs';

import api from './api/index';

const PORT = 5000;
const VIEW_PATH = `${__dirname}/../../views`;
const DEV_CLIENT_PATH = `${__dirname}/../client/dev`;
const PROD_CLIENT_PATH = `${__dirname}/../client/prod`;
const STATIC_PATH = `${__dirname}/../../public`;

const router = Router();
const app = new Koa();
export default app;

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

app.use(mount('/api', api));

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

app.listen(PORT)
console.info(`listening on port ${PORT}`);
