
import create from '../actionFactory';

import {
  ADD_GOAL,
  MOVE_GOAL,
  REMOVE_GOAL,
  CHANGE_GOAL_TEXT
} from '../../constants/action-types';

export function changeGoalText(val) {
  return create(CHANGE_GOAL_TEXT, val)
}
export function addGoal() {
  return create(ADD_GOAL);
}
export function moveGoal(prevIdx, newIdx) {
  return create(MOVE_GOAL, { prevIdx, newIdx });
}
export function removeGoal(id) {
  return create(REMOVE_GOAL, id);
}
