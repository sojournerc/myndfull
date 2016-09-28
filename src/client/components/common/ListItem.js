
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import MenuItem from 'material-ui/MenuItem';
import DroppableTarget from '../../connectors/DroppableTarget';
import { RemoveButton } from './Buttons';

// import ITEM_TYPES, { ComponentMap } from '../../constants/item-types';

export default create({
  displayName: 'ListItem',
  propTypes: {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
    itemType: React.PropTypes.oneOf(ITEM_TYPES).isRequired,
    isLast: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
    isTouch: React.PropTypes.bool.isRequired,
    onDragStart: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
    onTouchMove: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func
  },
  _handleDragStart(ev) {
    const { itemType, index, item } = this.props;
    this.props.onDragStart(itemType, index, item);
  },
  _handleDragEnd(ev) {
    this.props.onDragEnd()
  },
  _handleTouchMove(ev) {
    const { itemType, index, item } = this.props;
    this.props.onTouchMove(ev, itemType, index, item);
  },
  _handleTouchEnd() {
    this.props.onTouchEnd();
  },
  render() {
    const { item, index, itemType, isLast, isMobile, isTouch } = this.props;
    const Item = ComponentMap[itemType];
    return <div>
      <DroppableTarget  type={itemType} index={index} />
      <MenuItem
        onTouchTap={(e) => { console.log('touchTap') }}

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
      {isLast && <DroppableTarget type={itemType} index={index+1} />}
    </div>
  }
});
