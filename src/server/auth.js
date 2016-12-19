
import Koa from 'koa';
import KoaBody from 'koa-body';
import Router from 'koa-router';

import { Strategy } from 'passport-local';

// setup passport
import passport from 'koa-passport';
passport.use(new Strategy(function(username, password, done) {
  // retrieve user ...
  if (username === 'test' && password === 'test') {
    done(null, { id: 'boop' })
  } else {
    console.log('HERE')
    done(null, false)
  }
}));

const app = new Koa();
const router = Router()
const koaBody = KoaBody();

// login / logout endpoints
router.post('/login', koaBody, function*() {
  const login = this.req.login;
  const self = this;
  const handleError = (e) => {
    this.status = 500; 
    this.body = e.message || e;
  }

  // console.log(self);
  yield passport.authenticate('local', {
  }, function*(err, user, info, status) {
    if (err) return handleError(err);
    if (!user) {
      self.status = 403;
      return;
    }
    console.log(user)
    login(user, (er) => {
      if (er) return handleError(er);
      self.body = user;
      self.status = 200;
    })
  })
});

app.use(router.routes());

export default app;