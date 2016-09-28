
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
      url: __getUrl(instance.constructor.API_PATH),
      method: 'GET',
      params,
      start: get,
      success: getSuccess,
      fail: getFail
    });
  }
  
  // CRUD actions
  static _add(instance) {
    return createFetch({
      url: __getUrl(instance.constructor.API_PATH),
      method: 'POST',
      body: itemJSON,
      start: add,
      success: addSuccess,
      fail: addFail
    });
  }

  // instance only crud
  static _update(instance) {
    return createFetch({
      url: __getUrl(instance.constructor.API_PATH),
      method: 'PUT',
      body: itemJSON,
      start: update,
      success: updateSuccess,
      fail: updateFail
    });
  }

  static _remove(instance) {
    return createFetch({
      url: __getUrl(instance.constructor.API_PATH),
      method: 'DELETE',
      body: itemJSON,
      start: remove,
      success: removeSuccess,
      fail: removeFail
    });
  }
}

const __getUrl = (apiPath, pathParam) => (`/api/${apiPath}${pathParam ? `/${pathParam}` : ''}`);
