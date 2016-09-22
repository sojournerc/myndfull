
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
  GOAL_FORM_CHANGE
} from '../../constants/action-types';

import GoalModel, { create } from '../../models/GoalModel';

const initialState = Object.freeze({
  goalList: [],
  formValues: {
    text: ''
  },
  isFetching: false,
  isSaving: false
});

export default function goals(state = initialState, { type, payload }) {
  switch (type) {
  case GET_GOALS:
    return Object.assign({}, state, {'isFetching': true});
  case GET_GOALS_SUCCESS:
    return Object.assign({}, state, { isFetching: false, goalList: payload });
  case GET_GOALS_FAIL:
    return Object.assign({}, state, {'isFetching': false});
  case ADD_GOAL:
    return Object.assign({}, state, {'isSaving': true});
  case ADD_GOAL_SUCCESS:
    return Object.assign({}, state, { formValues: Object.assign(initialState.formValues), isSaving: false });
  case ADD_GOAL_FAIL:
    return Object.assign({}, state, {'isSaving': false});
  case UPDATE_GOAL:
    return state;
  case REMOVE_GOAL:
    return state;
  case GOAL_FORM_CHANGE:
    debugger;
    // https://www.npmjs.com/package/immutable-setter
  default:
    return state;
  }
}
