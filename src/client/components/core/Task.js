
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { RemoveButton } from '../common/Buttons';

export default create({
  displayName: 'Task',
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
      'flex',
      'flex-row',
      'items-center',
      'p1'
    )}>
      <span className="flex-gs-item">{item.text}</span>
      <span className="flex-item pl1">
        <RemoveButton onClick={this._handleRemoveClick} />
      </span>
    </div>
  }
});
