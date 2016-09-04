
import create from '../actionFactory';

import {
  SET_MODE
} from '../../constants/action-types';

export function setMode(mode) {
  return create(SET_MODE, mode);
}
