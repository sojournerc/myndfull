
import { store } from '../redux';

import mapValues from 'lodash/mapValues';
import createAction from '../redux/actionFactory';
import createFetch from '../redux/fetchFactory';

import {
  propChange,
  add,
  addSuccess,
  addFail,
  get,
  getSuccess,
  getFail,
  remove,
  removeSuccess,
  removeFail,
  update,
  updateSuccess,
  updateFail
} from '../redux/api/actions';

import {
  GET,
  GET_SUCCESS,
  GET_FAIL,
  ADD,
  ADD_SUCCESS,
  ADD_FAIL,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  REMOVE,
  REMOVE_SUCCESS,
  REMOVE_FAIL,
  PROP_CHANGE
} from '../constants/action-types';

export default class BaseModel {
  
  constructor(args) {
    if (!this.constructor.TYPE) { throw new Error('Model classes must provide static TYPE'); }
    if (!this.constructor.API_PATH) { throw new Error('Model classes must provide static API_PATH'); }
    if (!this.constructor.FIELDS) { throw new Error('Model classes must provide static FIELDS'); }
    Object.freeze(
      Object.assign(
        this,
        mapValues(this.constructor.FIELDS, field => field.default),
        args
      )
    );
  }

  /**************
  
  * Instance Async (persistence)
  
  ***************/

  /**
   * @return a thunk that will persist the working item
   */
  save() {
    if (this.isNew) {
      return this.constructor._add(this);
    }
    return this.constructor._update(this);
  }

  /**
   * @return a thunk that will delete the specified item from persistence
   */
  remove() { return this.constructor._remove(this); }

  /**
   * @return thunk that will reorder the instance to the given index
   */
  reorder(idx) { return this.constructor._reorder(this, idx); }
  
  /****************

   * Instance Mutators
  
   ************/
  
  /**
   * @return action that will update the workingItem in
   *  the respective part of the state tree. 
   */
  change(...args) { return this.constructor._propChange(this, ...args); }

  /**
   * @return a new instance with value changed
   */
  set(...args) { return this.constructor._set(this, ...args); }

  /**
   * @return JSON representation of this object
   */
  toJSON() { return this.constructor._serialize(this); }

  /***************

  * Getters

  ****************/
  get type() { return this.constructor.TYPE; }
  get isNew() { return !this.id; }


  /***************

  * Class Static

  ****************/
  // update prop on instance
  static _propChange(instance, prop, value) {
    store.dispatch(createAction(PROP_CHANGE, { prop, value }, { Class: this }));
  }

  // CRUD actions
  static fetch(params) {
    return store.dispatch(createFetch({
      path: __getPath(this.API_PATH),
      method: 'GET',
      params,
      start: __wrapAction(this, get),
      success: __wrapAction(this, getSuccess),
      fail: __wrapAction(this, getFail)
    }));
  }
  
  // instance only crud
  static _add(instance) {
    return store.dispatch(createFetch({
      path: __getPath(this.API_PATH),
      method: 'POST',
      body: instance.toJSON(),
        start: __wrapAction(this, add),
      success: __wrapAction(this, addSuccess),
      fail: __wrapAction(this, addFail)
    }))
    .then(() => {
      this.fetch(instance.params);
    });
  }

  static _update(instance) {
    return store.dispatch(createFetch({
      path: __getPath(this.API_PATH),
      method: 'PUT',
      body: instance.toJSON(),
      start: __wrapAction(this, update),
      success: __wrapAction(this, updateSuccess),
      fail: __wrapAction(this, updateFail)
    }))
    .then(() => {
      this.fetch(instance.params);
    });
  }

  static _remove(instance) {
    return store.dispatch(createFetch({
      path: __getPath(this.API_PATH, instance.id),
      method: 'DELETE',
      start: __wrapAction(this, remove),
      success: __wrapAction(this, removeSuccess),
      fail: __wrapAction(this, removeFail)
    }))
    .then(() => {
      this.fetch(instance.params);
    });
  }

  static _reorder(instance, idx) {
    // order is stored starting at 1 to allow for resorting using 0 index 
    return this._update(instance.set('orderIndex', (idx + 1)));
  }

  // immutable mutator
  static _set(instance, prop, value) {
    return new instance.constructor(Object.assign({}, instance, { [prop]: value }));
  }

  static _serialize(instance) {
    const values = {};
    for (const field in this.FIELDS) {
      values[field] = instance[field];
    }
    return Object.assign({}, { 
      id: instance.id,
      orderIndex: instance.orderIndex
    }, values);
  }
}

const __getPath = (apiPath, pathParam) => (`/api/${apiPath}${pathParam ? `/${pathParam}` : ''}`);
const __wrapAction = (Class, action) => { return (pl) => {
  return action(pl, { Class });
}};
 