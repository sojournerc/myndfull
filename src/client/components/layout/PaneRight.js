
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'PaneRight',
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return <div id='PaneRight' className={cn(
      'p2',
      'border-left',
      {
        'flex-gs-20': true
      }
    )}>
      {this.props.children}
    </div>
  }
});
