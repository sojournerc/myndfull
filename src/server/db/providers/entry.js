
import Entry from '../schema/entry';
import db from '../index'
import { 
  getSessionedUser
} from '../db-util';

export default {
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
}
