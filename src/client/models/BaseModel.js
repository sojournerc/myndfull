
import mapValues from 'lodash/mapValues';
import createAction from '../state/actionFactory';
import createFetch from '../state/fetchFactory';

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
  updateFail,
  setWorkingItem
} from '../state/api/actions';

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
   *
   * Utility
   * 
   */
  
  /**
   * @return a new instance that is a clone of this 
   */
  clone() { return new this.constructor(this.toJSON()); }

  /**
   * @return JSON representation of this object
   */
  toJSON() { return this.constructor._serialize(this); }

  /**
   * Dispatches an action to make this item 
   * the working item
   */
  makeWorkingItem() { 
    return setWorkingItem(this.clone(), { Class: this.constructor });
  }


  /***************

  * Getters

  ****************/
  get valid() { return this.constructor._validate(this); }
  get type() { return this.constructor.TYPE; }
  get isNew() { return !this.id; }


  /***************

  * Class Static

  ****************/
  // update prop on instance
  static _propChange(instance, prop, value) {
    return createAction(PROP_CHANGE, { prop, value }, { Class: this });
  }

  // CRUD actions
  static fetch(params) {
    console.info('put caching back');
    // if state is valid for this path, then we don't need to fetch
    // if (store.getState().api[this.API_PATH].cacheValid) { 
    //   console.info(`cache is valid not fetching ${this.API_PATH}`)
    //   return; 
    // }
    return createFetch({
      path: __getPath(this.API_PATH),
      method: 'GET',
      params,
      start: __wrapAction(this, get),
      success: __wrapAction(this, getSuccess),
      fail: __wrapAction(this, getFail)
    });
  }
  
  // instance only crud
  static _add(instance) {
    return createFetch({
      path: __getPath(this.API_PATH),
      method: 'POST',
      body: instance.toJSON(),
        start: __wrapAction(this, add),
      success: __wrapAction(this, addSuccess),
      fail: __wrapAction(this, addFail)
    })
    // .then(() => {
    //   this.fetch(instance.params);
    // });
  }

  static _update(instance) {
    return createFetch({
      path: __getPath(this.API_PATH),
      method: 'PUT',
      body: instance.toJSON(),
      start: __wrapAction(this, update),
      success: __wrapAction(this, updateSuccess),
      fail: __wrapAction(this, updateFail)
    })
    // .then(() => {
    //   this.fetch(instance.params);
    // });
  }

  static _remove(instance) {
    return createFetch({
      path: __getPath(this.API_PATH, instance.id),
      method: 'DELETE',
      start: __wrapAction(this, remove),
      success: __wrapAction(this, removeSuccess),
      fail: __wrapAction(this, removeFail)
    })
    .then(() => {
      this.fetch(instance.params);
    });
  }

  static _reorder(instance, idx) {
    // order is stored starting at 1 to allow for resorting using 0 index,
    // but if we are moving towards the bottom of the list (orderIndex is increasing)
    // we would be subtracting 1 from the new index because everything moves up 
    // into the vacated spot, thus we only add one if the orderIndex is decreasing
    if ((idx+1) < instance.orderIndex) {
      idx++;      
    } 
    return this._update(instance.set('orderIndex', (idx)));
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

  static _validate(instance) {
    let valid = true;
    for (const field in this.FIELDS) {
      // check for required fields
      if (this.FIELDS[field].required && !instance[field]) { valid = false; }
    } 
    return valid
  }
}

const __getPath = (apiPath, pathParam) => (`/api/${apiPath}${pathParam ? `/${pathParam}` : ''}`);
const __wrapAction = (Class, action) => { return (pl) => {
  return action(pl, { Class });
}};
 