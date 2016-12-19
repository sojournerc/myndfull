
import React from 'react';
import { store } from '../../state';

import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import {
  setDropTarget,
  clearDropTarget
} from '../../state/dnd/actions';

function __isDragWithin(pos, el) {
  const boundRect = el.getBoundingClientRect();
  if ((pos.y <= boundRect.bottom && pos.y >= boundRect.top) &&
      (pos.x <= boundRect.right && pos.x >= boundRect.left)) {
    return true;
  }
}


const mapStateToProps = (state, props) => {
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

const mapDispatchToProps = (dispatch) => ({
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

const Target = create({
  displayName: 'Target',
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    isTargeted: React.PropTypes.bool.isRequired,
    onDragOver: React.PropTypes.func.isRequired,
    onDragLeave: React.PropTypes.func.isRequired,
    onDragDrop: React.PropTypes.func.isRequired,
    isTouch: React.PropTypes.bool.isRequired,
    dragPos: React.PropTypes.object,
    children: React.PropTypes.node
  },
  // if we're a touch device we need to detect whether
  // the dragPosition is going to be within the container of
  componentWillUpdate(props) {
    const { active, isTouch, isTargeted, dragPos, type, index } = props;
    if (this.props.active && isTouch && (!isTargeted && __isDragWithin(dragPos, this._droppableInner))) {
      this.props.onDragOver({ type, index });
    } else if (isTouch && isTargeted && !__isDragWithin(dragPos, this._droppableInner)) {
      this.props.onDragLeave();
    }
  },
  _handleDragOver(ev) {
    ev.preventDefault();
    if (!this.props.isTargeted) {
      this.props.onDragOver({ type: this.props.type, index: this.props.index });
    }
  },
  _handleDragLeave() {
    this.props.onDragLeave();
  },
  _handleDragDrop() {
    this.props.onDragDrop(this.props.index);
  },
  render() {
    const { active, children, isTargeted } = this.props;
    if (!active) {
      return <span />
    }
    return <div
      onDragOver={this._handleDragOver}
      onDragLeave={this._handleDragLeave}
      onDrop={this._handleDragDrop}
      className={cn(
        'droppable',
        {
          'droppable-mouseover': isTargeted
        }
      )}
    >
      <div
        className='droppable-inner'
        ref={(el) => { this._droppableInner = el; }}
      >
        {children}
      </div>
    </div>
  }
});

export default connect(Target, mapStateToProps, mapDispatchToProps);
