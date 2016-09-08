
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import ITEM_TYPES from '../../constants/item-types';

export default create({
  displayName: 'Target',
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    path: React.PropTypes.string.isRequired,
    isTargeted: React.PropTypes.bool.isRequired,
    handleMouseEnter: React.PropTypes.func.isRequired,
    handleMouseLeave: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },

  _handleMouseEnter() {
    this.props.handleMouseEnter(this.props.path);
  },
  _handleMouseLeave() {
    this.props.handleMouseLeave();
  },
  render() {
    const { active, children, isTargeted } = this.props;
    if (!active) {
      return <span />
    }
    return <div
      onMouseEnter={this._handleMouseEnter}
      onMouseLeave={this._handleMouseLeave}
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
