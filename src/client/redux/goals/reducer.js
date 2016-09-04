
import R from 'ramda';

import {
  ADD_GOAL,
  MOVE_GOAL,
  REMOVE_GOAL,
  CHANGE_GOAL_TEXT
} from '../../constants/action-types';

const initialState = {
  goalList: [],
  newGoalText: ''
};

export default function pages(state = initialState, { type, payload }) {
  switch (type) {
  case ADD_GOAL:
    return Object.assign({}, state, { selectedPageIdx: payload });
  case MOVE_GOAL:
    return state;
  case REMOVE_GOAL:
    return state;
  case CHANGE_GOAL_TEXT:
    return Object.assign({}, state, { newGoalText: payload })
  default:
    return state;
  }
}
