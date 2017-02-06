
import Task from '../schema/task';
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
    yield incOrderIndexAbove(db, Task.getTableName(), 0, userId);
    return Task.create(Object.assign({}, body, { 
      orderIndex: 1,
      userId  
    }));
  },
  update: function*(body, ctx) {
    // look up item to be updated
    const updating = yield Task.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      yield reorder(db, Task, body, updating, getSessionedUser(ctx).id);
    }
    // TODO: need to check that the userId matches that of the session
    // and that the goal is owned by that userId
    yield Task.upsert(body);
    // upsert doesn't return the updated record
    return Task.findById(body.id);
  },
  get: function*(query, ctx) {
    return Task.findAll({
      order: ['orderIndex'],
      where: { userId: getSessionedUser(ctx).id }
    });
  },
  remove: function*(id, ctx) {
    const task = yield Task.findById(id);
    const userId = getSessionedUser(ctx).id;
    const removingOrderIndex = task.orderIndex;
    yield Task.destroy({ where: { 
      userId,
      id
    }})
    yield decOrderIndexAbove(
      db, 
      Task.getTableName(), 
      removingOrderIndex, 
      userId
    );
  }
}
