
import R from 'ramda';

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
  UPDATE_GOAL,
  UPDATE_GOAL_SUCCESS,
  UPDATE_GOAL_FAIL,
  REMOVE_GOAL,
  REMOVE_GOAL_SUCCESS,
  REMOVE_GOAL_FAIL,
  CHANGE_GOAL_TEXT
} from '../../constants/action-types';

export function changeGoalText(val) {
  return create(CHANGE_GOAL_TEXT, val)
}
export function moveGoal(path, goal) {
  return function(dispatch) {
    // orderIndex starts at 0 to allow the backend to use 0 to move around elements
    const clone = R.clone(goal);
    clone.orderIndex = (parseInt(path.split('.')[1]) + 1)
    return dispatch(putGoal(clone)).then(() => {
      dispatch(fetchGoals());
    });
  }
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

/**
 * GOAL UPDATING
 */
export function updateGoal() {
  return create(UPDATE_GOAL)
}
export function updateGoalSuccess(got) {
  return create(UPDATE_GOAL_SUCCESS, got);
}
export function updateGoalFail(res) {
  return create(UPDATE_GOAL_FAIL, res);
}
export function putGoal(goal) {
  // const goal = {
  //   text,
  //   orderIndex: store.getState().goals.goalList.length+1
  // };
  return createFetch({
    url: `/api/goals`,
    method: 'PUT',
    body: goal,
    start: updateGoal,
    success: updateGoalSuccess,
    fail: updateGoalFail
  });
}
