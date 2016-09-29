
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

  get type() { return this.constructor.TYPE; }
  get isNew() { return !this.id }

  // Proxy these methods on each instance for convenience
  update(...args) { return super._update(this, ...args); }
  remove() { return super._remove(this); }
  add() { return super._add(this); }

  // mutators
  static set(instance, prop, value) {
    return new instance.constructor(Object.assign({}, instance, { [prop]: value }));
  }

  // update prop on instance
  static propChange(instance, prop, value) {
    store.dispatch(createAction(PROP_CHANGE, { prop, value }));
  }

  static fetch(params) {
    return createFetch({
      url: __getUrl(this.API_PATH),
      method: 'GET',
      params,
      start: __wrapAction(this, get),
      success: __wrapAction(this, getSuccess),
      fail: __wrapAction(this, getFail)
    });
  }
  
  // CRUD actions
  static _add(instance) {
    return createFetch({
      url: __getUrl(instance.constructor.API_PATH),
      method: 'POST',
      body: itemJSON,
      start: __wrapAction(this, add),
      success: __wrapAction(this, addSuccess),
      fail: __wrapAction(this, addFail)
    });
  }

  // instance only crud
  static _update(instance) {
    return createFetch({
      url: __getUrl(instance.constructor.API_PATH),
      method: 'PUT',
      body: itemJSON,
      start: __wrapAction(this, update),
      success: __wrapAction(this, updateSuccess),
      fail: __wrapAction(this, updateFail)
    });
  }

  static _remove(instance) {
    return createFetch({
      url: __getUrl(instance.constructor.API_PATH),
      method: 'DELETE',
      body: itemJSON,
      start: __wrapAction(this, remove),
      success: __wrapAction(this, removeSuccess),
      fail: __wrapAction(this, removeFail)
    });
  }
}

const __getUrl = (apiPath, pathParam) => (`/api/${apiPath}${pathParam ? `/${pathParam}` : ''}`);
const __wrapAction = (Class, action) => { return (pl) => {
  return action(pl, { Class });
}} 
