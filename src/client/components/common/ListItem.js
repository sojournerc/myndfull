
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import MenuItem from 'material-ui/MenuItem';
import DroppableTarget from '../../connectors/DroppableTarget';
import { RemoveButton } from './Buttons';

import ITEM_TYPES, { ComponentMap } from '../../constants/item-types';

export default create({
  displayName: 'ListItem',
  propTypes: {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
    itemType: React.PropTypes.oneOf(ITEM_TYPES).isRequired,
    isLast: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
    onDragStart: React.PropTypes.func,
    onDragEnd: React.PropTypes.func
  },
  _handleDragStart(ev) {
    const { itemType, index, item } = this.props;
    this.props.onDragStart(itemType, index, item);
  },
  _handleDragEnd(ev) {
    this.props.onDragEnd()
  },
  render() {
    const { item, index, itemType, isLast, isMobile } = this.props;
    const Item = ComponentMap[itemType];
    return <div>
      <DroppableTarget  type={itemType} index={index} />
      <MenuItem
        draggable
        onTouchTap={(e) => { console.log('touchTap') }}

        // desktop
        onDragStart={this._handleDragStart}
        onDragEnd={this._handleDragEnd}

        desktop={!isMobile}
      >
        <div className={cn({py2: !isMobile})} >
          <Item item={item} index={index} />
        </div>
      </MenuItem>
      {isLast && <DroppableTarget type={itemType} index={index+1} />}
    </div>
  }
});
