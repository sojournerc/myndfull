
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'Header',
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return <div id="Header" className={cn(
      'border-bottom'
    )}>
      {this.props.children}
    </div>
  }
});
