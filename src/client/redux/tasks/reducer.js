
import R from 'ramda';

import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  REMOVE_TASK,
  CHANGE_TASK_TEXT
} from '../../constants/action-types';

const initialState = {
  taskList: [],
  newTaskText: '',
  isFetching: false,
  isSaving: false
};

export default function pages(state = initialState, { type, payload }) {
  switch (type) {
  case GET_TASKS:
    return Object.assign({}, state, { isFetching: true });
  case GET_TASKS_SUCCESS:
    return Object.assign({}, state, { isFetching: false, taskList: payload });
  case GET_TASKS_FAIL:
    return Object.assign({}, state, { isFetching: false });
  case ADD_TASK:
    return Object.assign({}, state, { isSaving: true });
  case ADD_TASK_SUCCESS:
    return Object.assign({}, state, { newTaskText: '', isSaving: false });
  case ADD_TASK_FAIL:
    return Object.assign({}, state, { isSaving: false });
  case UPDATE_TASK:
    return state;
  case REMOVE_TASK:
    return state;
  case CHANGE_TASK_TEXT:
    return Object.assign({}, state, { newTaskText: payload });
  default:
    return state;
  }
}
