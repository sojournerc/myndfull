
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import { store } from '../../state/index';

import Target from './Target';

import {
  startDrag,
  endDrag,
  moveDrag
} from '../../state/dnd/actions';

const persistReorder = (dispatch, props) => {
  const state = store.getState();
  const { dragging, dropTarget, draggingItem } = state.dnd;
  // if we are touch then we need to add the element here
  // otherwise this happens in droppable on the onDrop event
  if (dragging && !!dropTarget) {
    const updateClone = draggingItem.set('orderIndex',
      draggingItem.orderIndex > dropTarget.index ? dropTarget.index + 1 : dropTarget.index);
    dispatch(updateClone.save())
      .then(() => dispatch(props.ItemClass.fetch()));
  }
};

const mapStateToProps = (state) => ({
  isTouch: state.ui.clientInfo.isTouch,
  isMobile: state.ui.clientInfo.isMobile()
});

const mapDispatchToProps = (dispatch, props) => ({
  onDragStart(index, item) {
    dispatch(startDrag({
      dragging: true,
      draggingIndex: index,
      draggingItem: item
    }));
  },
  onDragEnd() {
    persistReorder(dispatch, props);
    dispatch(endDrag());
  },
  onTouchMove(ev, index, item) {
    const touch = ev.targetTouches[0];
    if (store.getState().dnd.dragging) {
      dispatch(moveDrag({
        dragX: touch.pageX,
        dragY: touch.pageY
      }));
    } else {
      dispatch(startDrag({
        dragX: touch.pageX,
        dragY: touch.pageY,
        dragging: true,
        draggingIndex: index,
        draggingItem: item
      }));
    }
  },
  onTouchEnd() {
    persistReorder(dispatch, props);
    dispatch(endDrag());
  },
  makeWorkingItem() {
    dispatch(props.item.makeWorkingItem());
  }
});


const Item = create({
  displayName: 'ListItem',
  propTypes: {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
    ItemClass: React.PropTypes.func.isRequired,
    isLast: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
    isTouch: React.PropTypes.bool.isRequired,
    onShowForm: React.PropTypes.func.isRequired,
    makeWorkingItem: React.PropTypes.func.isRequired,
    onDragStart: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
    onTouchMove: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func
  },
  _handleDragStart() {
    const { index, item } = this.props;
    this.props.onDragStart(index, item);
  },
  _handleDragEnd() {
    this.props.onDragEnd();
  },
  _handleTouchMove(ev) {
    const { index, item } = this.props;
    this.props.onTouchMove(ev, index, item);
  },
  _handleTouchEnd() {
    this.props.onTouchEnd();
  },
  _handleClick() {
    this.props.makeWorkingItem();
    this.props.onShowForm();
  },
  render() {
    const { item, index, isLast, isTouch } = this.props;
    return (
    <div>
      <Target type={item.type} index={index} />
      <div
        onClick={this._handleClick}

        // desktop
        draggable={!isTouch}
        onDragStart={!isTouch && this._handleDragStart}
        onDragEnd={!isTouch && this._handleDragEnd}

        // touch devices
        onTouchMove={this._handleTouchMove}
        onTouchEnd={this._handleTouchEnd}
      >
        <div className={'p2'} >
          <div
            className={cn(
             'flex',
             'flex-row',
             'items-center'
            )}
          >
            <span className="lightest-color flex-gs-item line-height-4 truncate">
              {item.text}
            </span>
          </div>
        </div>
      </div>
      {isLast && <Target type={item.type} index={index + 1} />}
    </div>
    );
  }
});

export default connect(Item, mapStateToProps, mapDispatchToProps);
