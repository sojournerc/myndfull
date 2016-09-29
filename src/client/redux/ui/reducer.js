
import { MOBILE_BREAKPOINT } from '../../constants/misc';
import { setIn } from 'immutable-setter';

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
const initialState = Object.freeze({
  activeView: LOG_VIEW, // used in mobile
  showingForm: false,
  clientInfo: {
    viewport: getViewport(),
    // http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript#4819886
    isTouch: !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator),
    isMobile() { return this.viewport.width <= MOBILE_BREAKPOINT; }
  }
});

export default function ui(state = initialState, { type, payload }) {
  switch (type) {
  case SHOW_FORM:
    return Object.assign({}, state, { 'showingForm': payload });
  case HIDE_FORM:
    return Object.assign({}, state, { 'showingForm': null });
  case VIEWPORT_CHANGE:
    return setIn(state, ['clientInfo', 'viewport'], payload);
  case ACTIVE_VIEW_CHANGE:
    return Object.assign({}, state, { 'activeView': payload });
  default:
    return state;
  }
}
;