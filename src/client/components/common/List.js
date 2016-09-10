
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import ITEM_TYPES from '../../constants/item-types';

import DraggableItem from '../../connectors/DraggableItem';

export default create({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemType: React.PropTypes.oneOf(ITEM_TYPES).isRequired
  },
  render() {
    const { items, itemType } = this.props;
    return (
      <div
        className={cn(
        )}>
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
