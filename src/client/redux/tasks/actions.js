
import create from '../actionFactory';

import {
  ADD_TASK,
  MOVE_TASK,
  REMOVE_TASK,
  CHANGE_TASK_TEXT
} from '../../constants/action-types';

export function addGoal() {
  return createAsync(ADD_TASK, addGoalSuccess, addGoalFail);
}
export function addGoalSuccess() {

}
export function addGoalFail() {

}

export function changeTaskText(val) {
  return create(CHANGE_TASK_TEXT, val)
}
export function moveGoal(prevIdx, newIdx) {
  return create(MOVE_TASK, { prevIdx, newIdx });
}
export function removeGoal(id) {
  return create(REMOVE_TASK, id);
}
