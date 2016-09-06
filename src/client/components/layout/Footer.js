
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'Footer',
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return <div id="Footer" className={cn(

    )}>
      {this.props.children}
    </div>
  }
});
