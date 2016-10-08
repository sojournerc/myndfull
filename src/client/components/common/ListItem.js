
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { showForm } from '../../redux/ui/actions';

import MenuItem from 'material-ui/MenuItem';
import DroppableTarget from '../../connectors/DroppableTarget';
import { RemoveButton } from './Buttons';

import { TYPE_LIST } from '../../models'

export default create({
  displayName: 'ListItem',
  propTypes: {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
    ItemClass: React.PropTypes.func.isRequired,
    isLast: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
    isTouch: React.PropTypes.bool.isRequired,
    onShowForm: React.PropTypes.func.isRequired,
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
    this.props.item.makeWorkingItem();
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
      <DroppableTarget  type={item.type} index={index} />
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
            <span className="flex-item pl1">
              <RemoveButton onClick={this._handleRemoveClick} />
            </span>
          </div>
        </div>
      </MenuItem>
      {isLast && <DroppableTarget type={item.type} index={index+1} />}
    </div>
  }
});
