
import create from '../actionFactory';

import {
  SHOW_FORM,
  HIDE_FORM
} from '../../constants/action-types';

export function showForm(itemType) {
  return create(SHOW_FORM, itemType);
}
export function hideForm() {
  return create(HIDE_FORM);
}
