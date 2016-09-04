
import R from 'ramda';

import {
  ADD_TASK,
  MOVE_TASK,
  REMOVE_TASK,
  CHANGE_TASK_TEXT
} from '../../constants/action-types';

const initialState = {
  taskList: [],
  newTaskText: ''
};

export default function pages(state = initialState, { type, payload }) {
  switch (type) {
  case ADD_TASK:
    return Object.assign({}, state, { selectedPageIdx: payload });
  case MOVE_TASK:
    return state;
  case REMOVE_TASK:
    return state;
  case CHANGE_TASK_TEXT:
    return Object.assign({}, state, { newTaskText: payload });
  default:
    return state;
  }
}
