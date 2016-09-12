
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { RemoveButton } from '../common/Buttons';

export default create({
  displayName: 'Goal',
  propTypes: {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
    onRemoveItem: React.PropTypes.func.isRequired
  },
  _handleRemoveClick(ev) {
    ev.preventDefault()
    ev.stopPropagation();
    this.props.onRemoveItem(this.props.item.id);
  },
  render() {
    const { item } = this.props;
    return <div className={cn(
      'list-item',
      'flex',
      'flex-row',
      'items-center',
      'p2',
      'break-word'
    )}>
      <span className="flex-gs-item">{item.text}</span>
      <span className="flex-item pl1 item-controls">
        <RemoveButton onClick={this._handleRemoveClick} />
      </span>
    </div>
  }
});
