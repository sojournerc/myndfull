
import Immutable from 'seamless-immutable';

import { MOBILE_BREAKPOINT } from '../../constants/misc';

import {
  SHOW_FORM,
  HIDE_FORM,
  VIEWPORT_CHANGE,
  ACTIVE_VIEW_CHANGE
} from '../../constants/action-types';

import {
  LOG_VIEW,
} from '../../constants/main-views';

import { getViewport } from 'dom-util';

const viewport =  getViewport();
const initialState = Immutable({
  activeView: LOG_VIEW, // used in mobile
  showingForm: false,
  clientInfo: {
    viewport: getViewport(),
    isMobile() { return this.viewport.width <= MOBILE_BREAKPOINT; }
  }
});

export default function ui(state = initialState, { type, payload }) {
  switch (type) {
  case SHOW_FORM:
    return state.set('showingForm', payload);
  case HIDE_FORM:
    return state.set('showingForm', null);
  case VIEWPORT_CHANGE:
    return state.setIn(['clientInfo', 'viewport'], payload);
  case ACTIVE_VIEW_CHANGE:
    return state.set('activeView', payload);
  default:
    return state;
  }
}
