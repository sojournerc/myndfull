
import { MOBILE_BREAKPOINT } from '../../constants/misc';
import { setIn } from 'immutable-setter';

import {
  SHOW_FORM,
  HIDE_FORM,
  VIEWPORT_CHANGE,
  ACTIVE_VIEW_CHANGE
} from '../../constants/action-types';




import { getViewport } from 'dom-util';

const viewport =  getViewport();
const initialState = Object.freeze({
  showingForm: {},
  clientInfo: {
    viewport: getViewport(),
    // http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript#4819886
    isTouch: !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator),
    isMobile() { return this.viewport.width <= MOBILE_BREAKPOINT; }
  }
});

export default function ui(state = initialState, { type, payload }) {
  let temp = state;
  switch (type) {
  case SHOW_FORM:
    return setIn(temp, ['showingForm', payload], true);
  case HIDE_FORM:
    return setIn(temp, ['showingForm', payload], false);
  case VIEWPORT_CHANGE:
    return setIn(temp, ['clientInfo', 'viewport'], payload);
  default:
    return state;
  }
}
;