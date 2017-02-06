
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import { showForm } from '../../state/ui/actions';

import { RemoveButton } from './Buttons';

import { TYPE_LIST } from '../../models'

import { store } from '../../state/index';

import Target from './Target';

import {
  startDrag,
  endDrag,
  moveDrag
} from '../../state/dnd/actions';

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
    dispatch(endDrag());
  },
  onTouchMove(ev, index, item) {
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
        draggingIndex: index,
        draggingItem: item
      }))
    }
  },
  onTouchEnd() {
    const state = store.getState();
    const { dragging, dropTarget, draggingItem } = state.dnd;
    // if we are touch then we need to add the element here
    // otherwise this happens in droppable on the onDrop event
    if (dragging && !!dropTarget) {
      debugger;
    }
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
  _handleDragStart(ev) {
    const { index, item } = this.props;
    this.props.onDragStart(index, item);
  },
  _handleDragEnd(ev) {
    this.props.onDragEnd()
  },
  _handleTouchMove(ev) {
    const { index, item } = this.props;
    this.props.onTouchMove(ev, index, item);
  },
  _handleTouchEnd() {
    this.props.onTouchEnd();
  },
  _handleTouchTap() {
    this.props.makeWorkingItem();
    this.props.onShowForm();
  },
  _handleRemoveClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.item.remove();
  },
  render() {
    const { item, index, isLast, isMobile, isTouch } = this.props;
    return <div>
      <Target  type={item.type} index={index} />
      <MenuItem
        onTouchTap={this._handleTouchTap}

        desktop={!isMobile}

        // desktop
        draggable={!isTouch}
        onDragStart={!isTouch && this._handleDragStart}
        onDragEnd={!isTouch && this._handleDragEnd}

        // touch devices
        onTouchMove={this._handleTouchMove}
        onTouchEnd={this._handleTouchEnd}
      >
        <div className={cn({py2: !isMobile})} >
          <div className={cn(
            'flex',
            'flex-row',
            'items-center'
          )}>
            <span className="flex-gs-item line-height-4 truncate" style={{ minWidth: 0 }}>{item.text}</span>
          </div>
        </div>
      </MenuItem>
      {isLast && <Target type={item.type} index={index+1} />}
    </div>
  }
});

export default connect(Item, mapStateToProps, mapDispatchToProps);
