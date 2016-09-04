
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'Footer',
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return <div className={cn(
      'flex-gs-10',
      'p2',
      'border-top'
    )}>
      {this.props.children}
    </div>
  }
});
