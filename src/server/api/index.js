
import Koa from 'koa';
import KoaBody from 'koa-body';
import Router from 'koa-router';

import goalProvider from '../db/providers/goal';
import taskProvider from '../db/providers/task';
import entryProvider from '../db/providers/entry';

const app = new Koa();
const router = Router()
const koaBody = KoaBody();

restify(goalProvider, 'goals');
restify(taskProvider, 'tasks');
restify(entryProvider, 'entries');

function handleError(ctx, err) {
  ctx.status = 400;
  ctx.body = { message: err.stack || err };
}

function restify(provider, path) {
  router.get(`/${path}`, function*(){
    try {
      const response = yield provider.get(this.query);
      this.status = 200;
      this.body = response;
    } catch (err) { handleError(this, err); }
  });
  router.post(`/${path}`, koaBody, function*() {
    try {
      const body = this.request.body;
      const created = yield provider.create(body);
      this.status = 201;
      this.body = created;
    } catch (err) { handleError(this, err); }
  });
  router.put(`/${path}`, koaBody, function*() {
    try {
      const body = this.request.body;
      const updated = yield provider.update(body);
      this.status = 200;
      this.body = updated;
    } catch (err) { handleError(this, err) }
  });
  router.delete(`/${path}/:id`, function*() {
    try {
      yield provider.remove(this.params.id);
      this.status = 204;
    } catch (err) { handleError(this, err); }
  });
}

app.use(router.routes());

export default app;
