
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import ITEM_TYPES from '../../constants/item-types';

import ListItem from './ListItem';
import { AddButton } from './Buttons';
import { TextInput } from './Inputs';

export default create({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemType: React.PropTypes.oneOf(ITEM_TYPES).isRequired,
    inputValue: React.PropTypes.string.isRequired,
    onAddItem: React.PropTypes.func.isRequired,
    onInputChange: React.PropTypes.func.isRequired
  },
  render() {
    const { items, inputValue, onAddItem, onInputChange } = this.props;
    return (
      <div
        className={cn(
          'items-center',
          'justify-around',
          {
          }
        )}>
          <div>
            <TextInput onChange={onInputChange} value={inputValue} />
            <AddButton onClick={onAddItem} text={'Add'} />
          </div>
          {items.map((item, i) =>
            <ListItem
              index={i}
              key={i}
              item={item}
              onClick={this.props.handlePagePick}
              selected={i === selectedPageIdx}
            />
          )}
      </div>
    )
  }
});
