
import Sequelize from 'sequelize';
import db from '../index';
import crypto from 'crypto';

import Task from './task';
import Entry from './entry';
import Goal from './goal';

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
}

User.hasMany(Task);
User.hasMany(Entry);
User.hasMany(Goal);

export default User;
