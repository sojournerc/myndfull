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

export const propChange = (pl) => createAction(PROP_CHANGE, pl)

export const add = (pl) => createAction(ADD, pl);
export const addSuccess = (pl) => createAction(ADD_SUCCESS, pl);
export const addFail = (pl) => createAction(ADD_FAIL, pl);

export const get = (pl) => createAction(GET, pl);
export const getSuccess = (pl) => createAction(GET_SUCCESS, pl);
export const getFail = (pl) => createAction(GET_FAIL, pl);

export const remove = (pl) => createAction(REMOVE, pl);
export const removeSuccess = (pl) => createAction(REMOVE_SUCCESS, pl);
export const removeFail = (pl) => createAction(REMOVE_FAIL, pl);

export const update = (pl) => createAction(UPDATE, pl);
export const updateSuccess = (pl) => createAction(UPDATE_SUCCESS, pl);
export const updateFail = (pl) => createAction(UPDATE_FAIL, pl);
