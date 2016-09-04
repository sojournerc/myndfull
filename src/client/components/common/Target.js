
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'Target',
  propTypes: {
    path: React.PropTypes.array.isRequired,
    active: React.PropTypes.bool.isRequired,
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
