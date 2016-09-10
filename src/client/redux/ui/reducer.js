
import {
  SHOW_FORM,
  HIDE_FORM
} from '../../constants/action-types';

const initialState = {
  showingForm: false
};

export default function ui(state = initialState, { type, payload }) {
  switch (type) {
  case SHOW_FORM:
    return Object.assign({}, state, { showingForm: payload });
  case HIDE_FORM:
    return Object.assign({}, state, { showingForm: null });
  default:
    return state;
  }
}
