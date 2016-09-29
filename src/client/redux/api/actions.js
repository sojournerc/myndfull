import create from '../actionFactory';

import {
  PROP_CHANGE,
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
  REMOVE_FAIL
} from '../../constants/action-types';

export const propChange = (...args)    => create(PROP_CHANGE, ...args)
export const add = (...args)           => create(ADD, ...args);
export const addSuccess = (...args)    => create(ADD_SUCCESS, ...args);
export const addFail = (...args)       => create(ADD_FAIL, ...args);
export const get = (...args)           => create(GET, ...args);
export const getSuccess = (...args)    => create(GET_SUCCESS, ...args);
export const getFail = (...args)       => create(GET_FAIL, ...args);
export const remove = (...args)        => create(REMOVE, ...args);
export const removeSuccess = (...args) => create(REMOVE_SUCCESS, ...args);
export const removeFail = (...args)    => create(REMOVE_FAIL, ...args);
export const update = (...args)        => create(UPDATE, ...args);
export const updateSuccess = (...args) => create(UPDATE_SUCCESS, ...args);
export const updateFail = (...args)    => create(UPDATE_FAIL, ...args);
