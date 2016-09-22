
import React from 'react';

import { store } from '../../redux/index';

import {
  startDrag,
  endDrag,
  moveDrag
} from '../../redux/dnd/actions';

import {
  TargetActionMap
} from '../../constants/item-types'

export const mapStateToProps = (state) => ({
  isTouch: state.ui.clientInfo.isTouch,
  isMobile: state.ui.clientInfo.isMobile()
});

export const mapDispatchToProps = (dispatch) => ({
  onDragStart(type, index, item) {
    dispatch(startDrag({
      dragging: true,
      draggingType: type,
      draggingIndex: index,
      draggingItem: item
    }));
  },
  onDragEnd() {
    dispatch(endDrag());
  },
  onTouchMove(ev, type, index, item) {
    const touch = ev.targetTouches[0];
    if (store.getState().dnd.dragging) {
      dispatch(moveDrag({
        dragX: touch.pageX,
        dragY: touch.pageY
      }))
    } else {
      dispatch(startDrag({
        dragX: touch.pageX,
        dragY: touch.pageY,
        dragging: true,
        draggingType: type,
        draggingIndex: index,
        draggingItem: item
      }))
    }
  },
  onTouchEnd() {
    const state = store.getState();
    const { dragging, dropTarget, draggingType, draggingItem } = state.dnd;
    // if we are touch then we need to add the element here
    // otherwise this happens in droppable on the onDrop event
    if (dragging && !!dropTarget) {
      dispatch(TargetActionMap[draggingType](dropTarget.index, draggingItem));
    }
    dispatch(endDrag());
  }
});
