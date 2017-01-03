
import User from '../schema/user';
import db from '../index';
import { reorder } from '../db-util';

export default {
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
}
