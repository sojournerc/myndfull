
import Koa from 'koa';
import KoaBody from 'koa-body';
import Router from 'koa-router';

import Goal from '../db/schema/goal';

const app = new Koa();
const router = Router()
const koaBody = KoaBody();

restify(Goal, 'goals');

function handleError(ctx, err) {
  ctx.status = 400;
  ctx.body = err;
}

function restify(Model, path) {
  router.get(`/${path}`, function*(){
    try {
      const response = yield Model.findAll();
      this.status = 200;
      this.body = response;
    } catch (err) { handleError(this, err); }
  });
  router.post(`/${path}`, koaBody, function*() {
    try {
      const body = JSON.parse(this.request.body);
      const created = yield Model.create(body);
      this.status = 201;
      this.body = created;
    } catch (err) { handleError(this, err); }
  });
  router.put(`/${path}`, koaBody, function*() {
    try {
      const body = JSON.parse(this.request.body);
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
  router.delete(`/${path}/:id`, koaBody, function*() {
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

app.use(router.routes());

export default app;
