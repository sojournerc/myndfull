
import Immutable from 'seamless-immutable';

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

const initialState = Immutable({
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
    return state.set('isFetching', true);
  case GET_GOALS_SUCCESS:
    return state.merge({ isFetching: false, goalList: payload });
  case GET_GOALS_FAIL:
    return state.set('isFetching', false);
  case ADD_GOAL:
    return state.set('isSaving', true );
  case ADD_GOAL_SUCCESS:
    return state.merge({ formValues: Object.assign(initialState.formValues), isSaving: false });
  case ADD_GOAL_FAIL:
    return state.set('isSaving', false);
  case UPDATE_GOAL:
    return state;
  case REMOVE_GOAL:
    return state;
  case GOAL_FORM_CHANGE:
    // TODO: validate!!!
    return state.setIn(['formValues', payload.property], payload.value);
  default:
    return state;
  }
}
