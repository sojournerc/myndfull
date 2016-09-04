
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'PaneLeft',
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return <div id="PaneLeft" className={cn(
      'p2',
      'border-right',
      {
        'flex-gs-20': true
      }
    )}>
      {this.props.children}
    </div>
  }
});
