
import Goal from '../schema/goal';
import db from '../index';
import { reorder } from '../db-util';

export default {
  create: function*(body) {
    // add the new goal to the top of the list
    yield db.query(`UPDATE goals SET "orderIndex" = ("orderIndex" + 1)`);
    return Goal.create(Object.assign({}, body, { orderIndex: 1 }));
  },
  update: function*(body) {
    // look up item to be updated
    const updating = yield Goal.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      yield reorder(db, Goal, body, updating);
    }
    yield Goal.upsert(body);
    // upsert doesn't return the updated record
    return Goal.findById(body.id);
  },
  get: function*(query) {
    return Goal.findAll({
      order: ['orderIndex']
    });
  },
  remove: function*(id) {
    const goal = yield Goal.findById(id);
    const removingOrderIndex = goal.orderIndex;
    // destroy the item
    yield Goal.destroy({ where: { id }})
    // update the other rows to have correct orderIdx
    yield db.query(`UPDATE goals SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${removingOrderIndex} AND "deletedAt" IS NULL`);
    return;
  }
}
