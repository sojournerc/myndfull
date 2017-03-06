
import { path } from 'ramda'; 

export function* reorder(db, Schema, body, updating, userId) {
  const table = Schema.getTableName();
  // first set the one we're updating to 0 to get it out of the way
  yield Schema.update({ orderIndex: 0 }, { where: { id: body.id } });
  // down in order
  if (body.orderIndex > updating.orderIndex) {
    // everything above the old order index and below the new order index decreases one
    yield db.query(`
      UPDATE ${table} 
      SET "orderIndex" = ("orderIndex" - 1) 
      WHERE "orderIndex" > ${updating.orderIndex} 
        AND "orderIndex" <= ${body.orderIndex} 
        AND "userId" = ${userId}
        AND "deletedAt" IS NULL
    `);  
  } else if (body.orderIndex < updating.orderIndex) {
    // everything above the old order index and below the new order index increases one
    console.log(body.orderIndex, updating.orderIndex);
    yield db.query(`
      UPDATE ${table} 
      SET "orderIndex" = ("orderIndex" + 1) 
      WHERE "orderIndex" >= ${body.orderIndex} 
        AND "orderIndex" < ${updating.orderIndex} 
        AND "userId" = ${userId}
        AND "deletedAt" IS NULL
    `);
  }
}

export function* decOrderIndexAbove(db, table, idx, userId) {
  yield db.query(`
    UPDATE ${table} 
    SET "orderIndex" = ("orderIndex" - 1) 
      WHERE "orderIndex" > ${idx}
        AND "userId" = ${userId}
        AND "deletedAt" IS NULL
  `);
}

export function* incOrderIndexAbove(db, table, idx, userId) {
  yield db.query(`
    UPDATE ${table} 
    SET "orderIndex" = ("orderIndex" + 1)
      WHERE "orderIndex" > ${idx}
        AND "userId" = ${userId}
        AND "deletedAt" IS NULL
  `);
}

export function getSessionedUser(ctx) {
  const user = path(['session', 'passport', 'user'])(ctx);
  if (!user) { throw new Error('missing user'); }
  return user;
}
  