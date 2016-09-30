
import Goal from '../schema/goal';
import db from '../index'

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
      // first set the one we're updating to 0 to get it out of the way
      yield Goal.update({ orderIndex: 0 }, { where: { id: body.id } });
      // down in order
      if (body.orderIndex > updating.orderIndex) {
        // everything above the old order index and below the new order index increases one
        yield db.query(`UPDATE goals SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${updating.orderIndex} AND "orderIndex" <= ${body.orderIndex}`);
      // up in order
      } else if (body.orderIndex < updating.orderIndex) {
        // everything above the old order index and below the new order index decreases one
        yield db.query(`UPDATE goals SET "orderIndex" = ("orderIndex" + 1) WHERE "orderIndex" >= ${body.orderIndex} AND "orderIndex" < ${updating.orderIndex}`);
      }
    }
    return Goal.upsert(body);
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
    yield db.query(`UPDATE goals SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${removingOrderIndex}`);
    return;
  }
}
