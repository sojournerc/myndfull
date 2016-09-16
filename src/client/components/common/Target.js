
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import ITEM_TYPES from '../../constants/item-types';

export default create({
  displayName: 'Target',
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    isTargeted: React.PropTypes.bool.isRequired,
    onDragOver: React.PropTypes.func.isRequired,
    onDragLeave: React.PropTypes.func.isRequired,
    onDragDrop: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },
  _handleDragOver(ev) {
    ev.preventDefault();
    if (!this.props.isTargeted) {
      this.props.onDragOver({ type: this.props.type, index: this.props.index });
    }
  },
  _handleDragLeave() {
    this.props.onDragLeave();
  },
  _handleDragDrop() {
    this.props.onDragDrop(this.props.index);
  },
  render() {
    const { active, children, isTargeted } = this.props;
    if (!active) {
      return <span />
    }
    return <div
      onDragOver={this._handleDragOver}
      onDragLeave={this._handleDragLeave}
      onDrop={this._handleDragDrop}
      className={cn(
        'droppable',
        {
          'droppable-mouseover': isTargeted
        }
      )}
    >
      <div className='droppable-inner'>{children}</div>
    </div>
  }
});
