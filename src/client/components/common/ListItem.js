
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

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
    return <div id="ListItem" className={cn(
      'flex',
      'flex-row'
    )}>
      <span className="flex-10">{item.orderIndex}</span>
      <span className="flex-gs-item">{item.text}</span>
      <span className="flex-gs-item">
        <a href="#" onClick={this._handleRemoveClick}>{'remove'}</a>
      </span>
    </div>
  }
});
