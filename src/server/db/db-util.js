
export function* reorder(db, Schema, body, updating) {
  const table = Schema.getTableName();
  // first set the one we're updating to 0 to get it out of the way
  yield Schema.update({ orderIndex: 0 }, { where: { id: body.id } });
  // down in order
  if (body.orderIndex > updating.orderIndex) {
    // everything above the old order index and below the new order index decreases one
    yield db.query(`UPDATE ${table} SET "orderIndex" = ("orderIndex" - 1) WHERE "orderIndex" > ${updating.orderIndex} AND "orderIndex" <= ${body.orderIndex} AND "deletedAt" IS NULL`);
  // up in order
  } else if (body.orderIndex < updating.orderIndex) {
    // everything above the old order index and below the new order index increases one
    yield db.query(`UPDATE ${table} SET "orderIndex" = ("orderIndex" + 1) WHERE "orderIndex" >= ${body.orderIndex} AND "orderIndex" < ${updating.orderIndex} AND "deletedAt" IS NULL`);
  }
}
