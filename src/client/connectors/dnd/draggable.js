
import React from 'react';
import { store } from '../../../redux';

import {
  startDrag,
  endDrag,
  moveDrag
} from '../../../redux/dnd/actions';

import {
  addElement
} from '../../../redux/pages/actions';

export function mapStateToProps(state) {
  return {

  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onMouseDown(ev, type) {
      // left button
      if (ev.button === 0) {
        ev.stopPropagation();
        __addEvents();
        dispatch(startDrag({
          dragX: ev.pageX,
          dragY: ev.pageY,
          dragging: true,
          draggingType: type
        }));
      }
    }
  };
}

function _handleMouseUp(ev) {
  const dnd = store.getState().dnd;
  const { dragging, dropTarget, draggingType } = dnd;
  if (dragging) {
    ev.stopPropagation();
    __removeEvents();
    if (!!dropTarget) {
      store.dispatch(addElement(draggingType, dropTarget));
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
