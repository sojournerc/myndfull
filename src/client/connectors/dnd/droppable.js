
import React from 'react';

import {
  setDropTarget,
  clearDropTarget
} from '../../redux/dnd/actions';

export const mapStateToProps = (state, props) => {
  const isDragging = state.dnd.dragging;
  const splitDrag = isDragging && state.dnd.draggingPath.split('.');
  const splitPath = isDragging && props.path.split('.')
  return {
    active: isDragging && (splitDrag[0] === splitPath[0]),
    isTargeted: isDragging && props.path === state.dnd.dropTarget &&
                // targets next to the item being dragged would do nothing.
                (props.path !== state.dnd.draggingPath) &&
                (!(splitPath[0] === splitDrag[0] && splitPath[1] == (parseInt(splitDrag[1])+1)))
  }
};

export const mapDispatchToProps = (dispatch) => ({
  handleMouseEnter(path) {
    dispatch(setDropTarget(path))
  },

  handleMouseLeave() {
    dispatch(clearDropTarget());
  }
});
