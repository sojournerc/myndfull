
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import { RemoveButton } from './Buttons';

export default create({
  displayName: 'ListItem',
  propTypes: {
    index: React.PropTypes.number.isRequired,
    onRemoveItem: React.PropTypes.func.isRequired
  },
  _handleRemoveClick() {
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
