
import TaskModel, { create } from '../../models/TaskModel';

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
  TASK_FORM_CHANGE
} from '../../constants/action-types';

const initialState = Object.freeze({
  taskList: [],
  workingTask: new TaskModel(),
  isFetching: false,
  isSaving: false
});

export default function pages(state = initialState, { type, payload }) {
  switch (type) {
  case GET_TASKS:
    return Object.assign({}, state, { isFetching: true });
  case GET_TASKS_SUCCESS:
    return Object.assign({}, state, { isFetching: false, taskList: payload.map(create) });
  case GET_TASKS_FAIL:
    return Object.assign({}, state, { isFetching: false });
  case ADD_TASK:
    return Object.assign({}, state, { isSaving: true });
  case ADD_TASK_SUCCESS:
    return Object.assign({}, state, { workingTask: new TaskModel(), isSaving: false });
  case ADD_TASK_FAIL:
    return Object.assign({}, state, { isSaving: false });
  case UPDATE_TASK:
    return state;
  case REMOVE_TASK:
    return state;
  case TASK_FORM_CHANGE:
    return Object.assign(
      {},
      state,
      { workingTask: TaskModel.set(state.workingTask, payload.prop, payload.value) }
    )
  default:
    return state;
  }
}
