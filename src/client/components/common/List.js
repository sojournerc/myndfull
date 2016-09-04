
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import ITEM_TYPES from '../../constants/item-types';

import ListItem from './ListItem';
import { SubmitButton } from './Buttons';
import { TextInput } from './Inputs';

export default create({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemType: React.PropTypes.oneOf(ITEM_TYPES).isRequired,
    inputValue: React.PropTypes.string.isRequired,
    onAddItem: React.PropTypes.func.isRequired,
    onRemoveItem: React.PropTypes.func.isRequired,
    onInputChange: React.PropTypes.func.isRequired
  },
  _onSubmit(ev) {
    ev.preventDefault();
    if (this.props.inputValue) {
      this.props.onAddItem(this.props.inputValue);
    }
  },
  render() {
    const { items, inputValue, onAddItem, onRemoveItem, onInputChange } = this.props;
    return (
      <div
        className={cn(
          'items-center',
          'justify-around',
          {
          }
        )}>
          <form onSubmit={this._onSubmit}>
            <TextInput onChange={onInputChange} value={inputValue} />
            <SubmitButton text={'Add'} />
          </form>
          {items.map((item, i) =>
            <ListItem
              index={i}
              key={i}
              item={item}
              onRemoveItem={onRemoveItem}
            />
          )}
      </div>
    )
  }
});
