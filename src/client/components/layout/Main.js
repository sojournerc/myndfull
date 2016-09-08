
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'Main',
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return <div id="Main" className={cn(
      {
        'flex-gs-60': true
      }
    )}>
      {this.props.children}
    </div>
  }
});
