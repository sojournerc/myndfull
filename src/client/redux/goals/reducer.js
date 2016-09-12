
import R from 'ramda';

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

const initialState = {
  goalList: [],
  formValues: {
    text: ''
  },
  isFetching: false,
  isSaving: false
};

export default function goals(state = initialState, { type, payload }) {
  switch (type) {
  case GET_GOALS:
    return Object.assign({}, state, { isFetching: true });
  case GET_GOALS_SUCCESS:
    return Object.assign({}, state, { isFetching: false, goalList: payload });
  case GET_GOALS_FAIL:
    return Object.assign({}, state, { isFetching: false });
  case ADD_GOAL:
    return Object.assign({}, state, { isSaving: true });
  case ADD_GOAL_SUCCESS:
    return Object.assign({}, state, { newGoalText: '', isSaving: false });
  case ADD_GOAL_FAIL:
    return Object.assign({}, state, { isSaving: false });
  case UPDATE_GOAL:
    return state;
  case REMOVE_GOAL:
    return state;
  case GOAL_FORM_CHANGE:
    // TODO: validate!!!
    // merge formValues with payload
    const values = Object.assign({}, state.formValues, { [payload.property]: payload.value });
    return Object.assign({}, state, { formValues: values });
  default:
    return state;
  }
}
