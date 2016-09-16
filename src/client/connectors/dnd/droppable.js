
import React from 'react';
import { store } from '../../redux';

import {
  setDropTarget,
  clearDropTarget
} from '../../redux/dnd/actions';

import {
  TargetActionMap
} from '../../constants/item-types'

export const mapStateToProps = (state, props) => {
  const { dragging, draggingType, draggingIndex, dropTarget } = state.dnd;
  const active = true/*!!dragging && (draggingType === props.type)*/;
  const isTargeted =  (active && !!dropTarget) &&
                      (props.type === dropTarget.type && props.index === dropTarget.index) &&
                      // targets next to the item being dragged would do nothing.
                      (active && props.index !== draggingIndex && props.index !== (draggingIndex+1));

  return { active, isTargeted };
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
    const { draggingItem, draggingType } = dnd;
    store.dispatch(TargetActionMap[draggingType](idx, draggingItem));
  }
});
