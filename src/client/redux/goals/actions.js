
import create from '../actionFactory';
import createFetch from '../fetchFactory';
import { store } from '../index';

import {
  GET_GOALS,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAIL,
  ADD_GOAL,
  ADD_GOAL_SUCCESS,
  ADD_GOAL_FAIL,
  MOVE_GOAL,
  REMOVE_GOAL,
  REMOVE_GOAL_SUCCESS,
  REMOVE_GOAL_FAIL,
  CHANGE_GOAL_TEXT
} from '../../constants/action-types';

export function changeGoalText(val) {
  return create(CHANGE_GOAL_TEXT, val)
}
export function moveGoal(prevIdx, newIdx) {
  return create(MOVE_GOAL, { prevIdx, newIdx });
}

/**
 * GOAL REMOVAL
 */
export function removeGoal(id) {
  return create(REMOVE_GOAL, id);
}
export function removeGoalSuccess() {
  return create(REMOVE_GOAL_SUCCESS);
}
export function removeGoalFail() {
  return create(REMOVE_GOAL_FAIL);
}
export function deleteGoal(id) {
  return createFetch({
    url: `/api/goals/${id}`,
    method: 'DELETE',
    start: removeGoal,
    success: removeGoalSuccess,
    fail: removeGoalFail
  })
}

/**
 * GOAL FETCHING
 */
export function getGoals() {
  return create(GET_GOALS);
}
export function getGoalsSuccess(goals) {
  return create(GET_GOALS_SUCCESS, goals);
}
export function getGoalsFail(res) {
  return create(GET_GOALS_FAIL, res);
}
export function fetchGoals() {
  return createFetch({
    url: `/api/goals`,
    method: 'GET',
    start: getGoals,
    success: getGoalsSuccess,
    fail: getGoalsFail
  });
}

/**
 * GOAL ADDING
 */
export function addGoal() {
  return create(ADD_GOAL)
}
export function addGoalSuccess(got) {
  return create(ADD_GOAL_SUCCESS, got);
}
export function addGoalFail(res) {
  return create(ADD_GOAL_FAIL, res);
}
export function postNewGoal(text) {
  const goal = {
    text,
    orderIndex: store.getState().goals.goalList.length+1
  };
  return createFetch({
    url: `/api/goals`,
    method: 'POST',
    body: goal,
    start: addGoal,
    success: addGoalSuccess,
    fail: addGoalFail
  });
}
