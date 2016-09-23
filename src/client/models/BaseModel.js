
import { store } from '../redux';

import mapValues from 'lodash/mapValues';
import createAction from '../redux/actionFactory';

export default class BaseModel {
  constructor(args) {
    if (!this.constructor.FIELDS) { throw new Error('Model classes must provide static FIELDS'); }
    Object.freeze(
      Object.assign(
        this,
        mapValues(this.constructor.FIELDS, field => field.default),
        args
      )
    );
  }

  // instance methods
  get isNew() {
    return !this.id
  }

  // mutators
  static set(instance, prop, value) {
    return new instance.constructor(Object.assign({}, instance, { [prop]: value }));
  }

  // actions
  static move() {}
  static add() {}
  static update() {}
  static remove() {}

  static propChange(instance, prop, value) {
    store.dispatch(createAction(instance.constructor.PROP_CHANGE, { prop, value }));
  }
}
