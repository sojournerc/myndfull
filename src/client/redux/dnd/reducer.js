
import {
  START_DRAG,
  END_DRAG,
  MOVE_DRAG,
  SET_DROP_TARGET,
  CLEAR_DROP_TARGET
} from '../../constants/action-types';

const initialState = Object.freeze({
  dragX: 0,
  dragY: 0,
  dragging: false,
  draggingItem: undefined,
  draggingType: undefined,
  draggingPath: undefined,
  dropTarget: undefined
});

export default function dnd(state = initialState, { type, payload }) {
  switch (type) {
  case START_DRAG:
    return Object.assign({}, state, payload);
  case END_DRAG:
    return Object.assign({}, state, initialState);
  case MOVE_DRAG:
    return Object.assign({}, state, payload);
  case SET_DROP_TARGET:
    return Object.assign({}, state, { dropTarget: payload });
  case CLEAR_DROP_TARGET:
    return Object.assign({}, state, { dropTarget: undefined })
  default:
    return state;
  }
}
