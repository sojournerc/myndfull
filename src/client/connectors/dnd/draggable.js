
import React from 'react';

import {
  startDrag,
  endDrag,
  moveDrag
} from '../../redux/dnd/actions';

export const mapStateToProps = (state) => ({})

export const mapDispatchToProps = (dispatch) => ({
  onDragStart(type, index, item) {
    dispatch(startDrag({
      dragging: true,
      draggingItem: item,
      draggingType: type,
      draggingIndex: index
    }));
  },
  onDragEnd() {
    dispatch(endDrag());
  }
});
