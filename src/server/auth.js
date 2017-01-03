
import Koa from 'koa';
import KoaBody from 'koa-body';
import Router from 'koa-router';

import User from './db/schema/user';

import { Strategy } from 'passport-local';

import userProvider from './db/providers/user';

// setup passport
import passport from 'koa-passport';

passport.use(new Strategy(function(username, password, done) {
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
    })
  })
});

router.post('/register', koaBody, function*() {
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

app.use(router.routes());

export default app;