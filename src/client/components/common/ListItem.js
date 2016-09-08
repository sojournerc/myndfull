
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

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
    onMouseDown: React.PropTypes.func
  },
  _handleMouseDown(ev) {
    const { index, itemType, item } = this.props;
    this.props.onMouseDown(ev, itemType, index, item);
  },
  render() {
    const { item, index, itemType, isLast } = this.props;
    const Item = ComponentMap[itemType];
    return <div onMouseDown={this._handleMouseDown}>
      <DroppableTarget path={`${itemType}.${index}`} />
      <Item item={item} index={index} />
      {isLast && <DroppableTarget path={`${itemType}.${index+1}`} />}
    </div>
  }
});
