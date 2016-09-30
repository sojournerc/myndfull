
import Models from '../../models';
import { setIn } from 'immutable-setter';

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
} from '../../constants/action-types';

const initialState = {};
const initiateApiState = ((Classes) => {
  for (const TYPE in Classes) {
    if (Classes.hasOwnProperty(TYPE)) {
      initialState[Classes[TYPE].API_PATH] = Object.freeze(
        // Initial state for each api item
        {
          items: [],
          workingItem: new Classes[TYPE](),
          isFetching: false,
          isSaving: false
        }
      );
    }
  }
})(Models)

Object.freeze(initialState);

export default function api(state = initialState, { type, payload, meta }) {
  const Class = meta && meta.Class;
  let temp;
  switch (type) {
  case PROP_CHANGE:
    return setIn(
      state, 
      [Class.API_PATH, 'workingItem'], 
      state[Class.API_PATH].workingItem.set(payload.prop, payload.value)
    );
  case GET:
    return setIn(state, [Class.API_PATH, 'isFetching'], true);
  case GET_FAIL:
    return setIn(state, [Class.API_PATH, 'isFetching'], false);
  case GET_SUCCESS:
    temp = setIn(state, [Class.API_PATH, 'isFetching'], false);
    return setIn(temp, [Class.API_PATH, 'items'], payload.map((res) => {
      return new Class(res);
    }));
  case ADD:
    return setIn(state, [Class.API_PATH, 'isSaving'], true);
  case ADD_SUCCESS:
    temp = setIn(state, [Class.API_PATH, 'isSaving'], false);
    return setIn(temp, [Class.API_PATH, 'workingItem'], new Class());
  case ADD_FAIL:
    return setIn(state, [Class.API_PATH, 'isSaving'], false);
  case UPDATE:
    return setIn(state, [Class.API_PATH, 'isSaving'], true);
  case UPDATE_SUCCESS:
    return setIn(state, [Class.API_PATH, 'isSaving'], false);
  case UPDATE_FAIL:
    return setIn(state, [Class.API_PATH, 'isSaving'], false);
  case REMOVE:
    return setIn(state, [Class.API_PATH, 'isSaving'], true);
  case REMOVE_SUCCESS:
    return setIn(state, [Class.API_PATH, 'isSaving'], false);
  case REMOVE_FAIL:
    return setIn(state, [Class.API_PATH, 'isSaving'], false);
  default: 
    return state;
  }
}
