
import React from 'react';
import { store } from '../../redux';

import {
  startDrag,
  endDrag,
  moveDrag
} from '../../redux/dnd/actions';

import {
  TargetActionMap
} from '../../constants/item-types'

export const mapStateToProps = (state) => ({})

export const mapDispatchToProps = (dispatch) => ({
  onMouseDown(ev, type, index, item) {
    // left button
    if (ev.button === 0) {
      ev.stopPropagation();
      __addEvents();
      dispatch(startDrag({
        dragX: ev.pageX,
        dragY: ev.pageY,
        dragging: true,
        draggingItem: item,
        draggingType: type,
        draggingPath: `${type}.${index}`
      }));
    }
  }
});

function _handleMouseUp(ev) {
  const dnd = store.getState().dnd;
  const { dragging, dropTarget, draggingType, draggingItem } = dnd;
  if (dragging) {
    ev.stopPropagation();
    __removeEvents();
    if (!!dropTarget) {
      store.dispatch(TargetActionMap[draggingType](dropTarget, draggingItem));
    }
    store.dispatch(endDrag());
  }
}

function _handleMouseMove(ev) {
  ev.preventDefault();
  store.dispatch(moveDrag({
    dragX: ev.pageX,
    dragY: ev.pageY
  }));
}

function __addEvents() {
  document.addEventListener('mousemove', _handleMouseMove);
  document.addEventListener('mouseup', _handleMouseUp);
}

function __removeEvents() {
  document.removeEventListener('mousemove', _handleMouseMove);
  document.removeEventListener('mouseup', _handleMouseUp);
}
