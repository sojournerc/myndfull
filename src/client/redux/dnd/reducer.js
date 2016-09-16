
import Immutable from 'seamless-immutable';

import {
  START_DRAG,
  END_DRAG,
  MOVE_DRAG,
  SET_DROP_TARGET,
  CLEAR_DROP_TARGET
} from '../../constants/action-types';

const initialState = Immutable({
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
    return state.merge(payload);
  case END_DRAG:
    return state.merge(initialState);
  case MOVE_DRAG:
    return state.merge(payload);
  case SET_DROP_TARGET:
    return state.merge({ dropTarget: payload });
  case CLEAR_DROP_TARGET:
    return state.merge({ dropTarget: undefined })
  default:
    return state;
  }
}
