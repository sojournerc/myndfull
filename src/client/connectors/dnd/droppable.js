
import React from 'react';
import { store } from '../../redux';

import {
  setDropTarget,
  clearDropTarget
} from '../../redux/dnd/actions';

export const mapStateToProps = (state, props) => {
  const { dragging, draggingItem, draggingIndex, dropTarget } = state.dnd;
  const active =  !!dragging && (draggingItem.type === props.type) &&
                  // targets next to the item being dragged would do nothing.
                  (props.index !== draggingIndex && props.index !== (draggingIndex+1));

  const isTargeted =  (active && !!dropTarget) &&
                      (props.type === dropTarget.type && props.index === dropTarget.index);

  return {
    active,
    isTargeted,
    isTouch: state.ui.clientInfo.isTouch,
    dragPos: {
      x: state.dnd.dragX,
      y: state.dnd.dragY
    }
  };
};

export const mapDispatchToProps = (dispatch) => ({
  onDragOver(dat) {
    dispatch(setDropTarget(dat))
  },
  onDragLeave() {
    dispatch(clearDropTarget());
  },
  onDragDrop(idx) {
    const dnd = store.getState().dnd;
    const { draggingItem } = dnd;
    draggingItem.reorder(idx);
  }
});
