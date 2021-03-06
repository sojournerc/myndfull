
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { TYPE_LIST } from '../../models';

import ListItem from './ListItem';
import Loading from './Loading.js'

export default create({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemsLoading: React.PropTypes.bool.isRequired,
    ItemClass: React.PropTypes.func.isRequired,
    onShowForm: React.PropTypes.func.isRequired
  },
  render() {
    const { items, ItemClass, itemsLoading } = this.props;

    if (itemsLoading) {
      return <div className="h100 flex items-start justify-center pb3 border-box">
        <Loading />
      </div>
    }

    return (
      <div className="list border-box lighter-bg">
        {!!items.length &&
        items.map((item, i) =>
          <ListItem
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
