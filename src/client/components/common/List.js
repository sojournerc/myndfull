
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { TYPE_LIST } from '../../models';

import DraggableItem from '../../connectors/DraggableItem';

export default create({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemLoading: React.PropTypes.bool.isRequired,
    itemType: React.PropTypes.oneOf(TYPE_LIST).isRequired
  },
  render() {
    const { items, itemType } = this.props;
    return (
      <div className="list border-box lighter-bg">
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
    )
  }
});
