
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'HeaderContent',
  propTypes: {
  },
  render() {
    return <div id="HeaderContent" className={cn(
    )}>
      <div className={cn('h1', 'p1')}>
        <span>{'Myndfull'}</span>
      </div>
    </div>
  }
});
