
import create from '../actionFactory';

import {
  START_DRAG,
  END_DRAG,
  // MOVE_DRAG,
  SET_DROP_TARGET,
  CLEAR_DROP_TARGET
} from '../../constants/action-types';

export function startDrag(pos) {
  return create(START_DRAG, pos);
}
export function endDrag() {
  return create(END_DRAG);
}
// export function moveDrag(pos) {
//   return create(MOVE_DRAG, pos);
// }
export function setDropTarget(path) {
  return create(SET_DROP_TARGET, path);
}
export function clearDropTarget() {
  return create(CLEAR_DROP_TARGET);
}
