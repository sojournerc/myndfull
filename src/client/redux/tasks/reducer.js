
import Immutable from 'seamless-immutable';

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

const initialState = Immutable({
  taskList: [],
  formValues: {
    text: '',
    notes: ''
  },
  isFetching: false,
  isSaving: false
});

export default function pages(state = initialState, { type, payload }) {
  switch (type) {
  case GET_TASKS:
    return state.merge({ isFetching: true });
  case GET_TASKS_SUCCESS:
    return state.merge({ isFetching: false, taskList: payload });
  case GET_TASKS_FAIL:
    return state.merge({ isFetching: false });
  case ADD_TASK:
    return state.merge({ isSaving: true });
  case ADD_TASK_SUCCESS:
    return state.merge({ formValues: Object.assign(initialState.formValues), isSaving: false });
  case ADD_TASK_FAIL:
    return state.merge({ isSaving: false });
  case UPDATE_TASK:
    return state;
  case REMOVE_TASK:
    return state;
  case TASK_FORM_CHANGE:
    return state.setIn(['formValues', payload.property], payload.value);
  default:
    return state;
  }
}
