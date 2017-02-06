
import Goal from '../schema/goal';
import db from '../index';
import { 
  reorder, 
  getSessionedUser,
  incOrderIndexAbove,
  decOrderIndexAbove
} from '../db-util';

export default {
  create: function*(body, ctx) {
    const userId = getSessionedUser(ctx).id;
    yield incOrderIndexAbove(db, Goal.getTableName(), 0, userId);
    return Goal.create(Object.assign({}, body, { 
      orderIndex: 1,
      userId
    }));
  },
  update: function*(body, ctx) {
    // look up item to be updated
    const updating = yield Goal.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      yield reorder(db, Goal, body, updating, getSessionedUser(ctx).id);
    }
    // TODO: need to check that the userId matches that of the session
    // and that the goal is owned by that userId
    yield Goal.upsert(body);
    // upsert doesn't return the updated record
    return Goal.findById(body.id);
  },
  get: function*(query, ctx) {
    return Goal.findAll({
      order: ['orderIndex'],
      where: { userId: getSessionedUser(ctx).id }
    });
  },
  remove: function*(id, ctx) {
    const goal = yield Goal.findById(id);
    const userId =  getSessionedUser(ctx).id
    const removingOrderIndex = goal.orderIndex;
    yield Goal.destroy({ 
      where: { 
        userId,
        id 
      }
    })
    yield decOrderIndexAbove(
      db, 
      Goal.getTableName(), 
      removingOrderIndex, 
      userId      
    );
  }
}
