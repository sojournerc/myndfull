
import Entry from '../schema/entry';
import db from '../index'

export default {
  create: function*(body) {
    return Entry.create(body);
  },
  update: function*(body) {
    return Entry.upsert(body);
  },
  get: function*(query) {
    return Entry.findAll({
    });
  },
  remove: function*(entry) {
    return Entry.destroy({ where: { id: entry.id }});
  }
}
