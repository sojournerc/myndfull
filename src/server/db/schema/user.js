
import Sequelize from 'sequelize';
import db from '../index';
import passportLocalSequelize from 'passport-local-sequelize';

import Task from './task';
import Entry from './entry';
import Goal from './goal';

const User = db.define('user', {
  username: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.EMAIL, allowNull: false },
  hash: { type: Sequelize.STRING, allowNull: false },
  salt: { type: Sequelize.STRING, allowNull: false }
}, {
  paranoid: true
});

const CRYPTO_OPTIONS = {
  saltlen:  32,
  iterations: 12000,
  keylen:  512
}

User.Instance.prototype.setPassword = (password, cb) => {
  if (!password) {
    return cb(new Error('Missing password'));
  }

  crypto.randomBytes(CRYPTO_OPTIONS.saltlen, (err, buf) => {
    if (err) {
      return cb(err);
    }

    var salt = buf.toString('hex');

    crypto.pbkdf2(password, salt, CRYPTO_OPTIONS.iterations, CRYPTO_OPTIONS.keylen, (err, hashRaw) => {
      if (err) {
        return cb(err);
      }

      this.set('hash', new Buffer(hashRaw, 'binary').toString('hex'));
      this.set('salt', salt);

      cb(null, this);
    });
  });
};

User.Instance.prototype.authenticate = (password, cb) => {

  if (!this.get('salt')) {
    return cb(new Error('Missing salt'));
  }

  crypto.pbkdf2(password, this.get('salt'), CRYPTO_OPTIONS.iterations, CRYPTO_OPTIONS.keylen, (err, hashRaw) => {
    if (err) {
      return cb(err);
    }

    var hash = new Buffer(hashRaw, 'binary').toString('hex');

    if (hash === this.get('hash')) {
      return cb(null, self);
    } else {
      return cb(null, false, { message: 'no good' });
    }
  });
};


User.hasMany(Task);
User.hasMany(Entry);
User.hasMany(Goal);

export default User;
