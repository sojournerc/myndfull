
import React from 'react';

import {
  setDropTarget,
  clearDropTarget
} from '.,/../../redux/dnd/actions';

export const mapStateToProps = (state, props) => ({
  active: state.dnd.dragging,
  isTargeted: props.path === state.dnd.dropTarget
});

export const mapDispatchToProps = (dispatch) => ({
  handleMouseEnter(path) {
    dispatch(setDropTarget(path))
  },

  handleMouseLeave() {
    dispatch(clearDropTarget());
  }
});
