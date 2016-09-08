
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import ITEM_TYPES from '../../constants/item-types';

import DraggableItem from '../../connectors/DraggableItem';

import TextForm from './TextForm';

export default create({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemType: React.PropTypes.oneOf(ITEM_TYPES).isRequired,
    inputValue: React.PropTypes.string.isRequired,
    onAddItem: React.PropTypes.func.isRequired,
    onInputChange: React.PropTypes.func.isRequired
  },
  _onSubmit(ev) {
    ev.preventDefault();
    if (this.props.inputValue) {
      this.props.onAddItem(this.props.inputValue);
    }
  },
  render() {
    const { items, itemType, inputValue, onAddItem, onRemoveItem, onInputChange } = this.props;
    return (
      <div
        className={cn(
        )}>
          <TextForm inputValue={inputValue} onInputChange={onInputChange} onAdd={onAddItem} />
          <div className="mb2 list border-box">
            {!!items.length &&
            items.map((item, i) =>
              <DraggableItem
                index={i}
                key={i}
                item={item}
                itemType={itemType}
                isLast={i === (items.length-1)}
              />
            )
            ||
            <div className="p2 center mid-color">{'-------- no items --------'}</div>
            }
          </div>
      </div>
    )
  }
});
