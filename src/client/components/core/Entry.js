
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import TimeStamp from '../common/TimeStamp';

export default create({
  displayName: 'Entry',
  propTypes: {
  },
  render() {
    const { entry } = this.props;
    return <div className={cn(
      'flex-item',
      'p2'
    )}>
      <div className={cn(
        'flex',
        'flex-row',
        'items-center'
      )}>
        <div className="flex-item pr1 mid-color">
          <TimeStamp time={entry.createdAt} />
        </div>
        <div className="flex-gs-item pl1">
          {entry.text}
        </div>
      </div>
    </div>
  }
});
