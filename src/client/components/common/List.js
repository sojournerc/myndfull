
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { TYPE_LIST } from '../../models';

import DraggableItem from '../../connectors/DraggableItem';

export default create({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemsLoading: React.PropTypes.bool.isRequired,
    ItemClass: React.PropTypes.func.isRequired,
    onShowForm: React.PropTypes.func.isRequired
  },
  render() {
    const { items, ItemClass } = this.props;
    return (
      <div className="list border-box lighter-bg">
        {!!items.length &&
        items.map((item, i) =>
          <DraggableItem
            index={i}
            key={i}
            item={item}
            ItemClass={ItemClass}
            isLast={i === (items.length-1)}
            onShowForm={this.props.onShowForm}
          />
        )
        ||
        <div className="p2 center mid-color">{'-------- no items --------'}</div>
        }
      </div>
    )
  }
});
