
import Task from '../schema/task';
import db from '../index'

export default {
  create: function*(body) {
    // add the new goal to the top of the list
    yield db.query(`UPDATE tasks SET "orderIndex" = ("orderIndex" + 1)`);
    return Task.create(Object.assign({}, body, { orderIndex: 1 }));
  },
  update: function*(body) {
    // look up item to be updated
    const updating = yield Task.findById(body.id);
    // if the new orderIndex doesn't match the old, we need to update some ordering
    if (body.orderIndex !== updating.orderIndex) {
      // first set the one we're updating to 0 to get it out of the way
      yield Task.update({ orderIndex: 0 }, { where: { id: body.id } });
      // down in order
      if (body.orderIndex > updating.orderIndex) {
        // everything above the old order index and below the new order index increases one
        yield db.query(`UPDATE tasks SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${updating.orderIndex} AND "orderIndex" <= ${body.orderIndex}`);
      // up in order
      } else if (body.orderIndex < updating.orderIndex) {
        // everything above the old order index and below the new order index decreases one
        yield db.query(`UPDATE tasks SET "orderIndex" = ("orderIndex" + 1) WHERE "orderIndex" >= ${body.orderIndex} AND "orderIndex" < ${updating.orderIndex}`);
      }
    }
    return Task.upsert(body);
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


// To swap two items (4 and 7):
// i.e. 0 is not used, so use a it as a dummy to avoid having an ambiguous item.
// UPDATE myitems SET orderindex = 0 WHERE orderindex = 4;
// UPDATE myitems SET orderindex = 4 WHERE orderindex = 7;
// UPDATE myitems SET orderindex = 7 WHERE orderindex = 0;

// To insert at 3:
//  UPDATE myitems SET orderindex = (orderindex + 1) WHERE orderindex > 2;
//  INSERT INTO myitems (Myitem,orderindex) values ("MytxtitemHere",3)



