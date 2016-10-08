
import Task from '../schema/task';
import db from '../index';
import { reorder } from '../db-util';

export default {
  create: function*(body) {
    // add the new task to the top of the list
    yield db.query(`UPDATE tasks SET "orderIndex" = ("orderIndex" + 1)`);
    return Task.create(Object.assign({}, body, { orderIndex: 1 }));
  },
  update: function*(body) {
    // look up item to be updated
    const updating = yield Task.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      yield reorder(db, Task, body, updating);
    }
    yield Task.upsert(body);
    // upsert doesn't return the updated record
    return Task.findById(body.id);
  },
  get: function*(query) {
    return Task.findAll({
      order: ['orderIndex']
    });
  },
  remove: function*(id) {
    const task = yield Task.findById(id);
    const removingOrderIndex = task.orderIndex;
    // destroy the item
    yield Task.destroy({ where: { id }})
    // update the other rows to have correct orderIdx
    yield db.query(`UPDATE tasks SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${removingOrderIndex}`);
    return;
  }
}
