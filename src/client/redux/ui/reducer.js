
import DEFAULT_MODE, {
  PAGE,
  SLIDE,
  TIMELINE,
  FORM
} from '../../constants/modes';

import {
  SET_MODE
} from '../../constants/action-types';

const initialState = {
  mode: DEFAULT_MODE
};

export default function ui(state = initialState, { type, payload }) {
  switch (type) {
  case SET_MODE:
    return Object.assign({}, state, { mode: payload });
  default:
    return state;
  }
}
