
import create from '../actionFactory';

import {
  SHOW_FORM,
  HIDE_FORM,
  VIEWPORT_CHANGE,
  ACTIVE_VIEW_CHANGE
} from '../../constants/action-types';

export function showForm(itemType) {
  return create(SHOW_FORM, itemType);
}

export function hideForm(payload) {
  return create(HIDE_FORM, payload);
}

export function viewportChange(payload) {
  return create(VIEWPORT_CHANGE, payload);
}

export function activeViewChange(view) {
  return create(ACTIVE_VIEW_CHANGE, view);
}
