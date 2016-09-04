
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import GoalList from '../../connectors/GoalList';
import TaskList from '../../connectors/TaskList';

export default create({
  displayName: 'PaneLeftContent',
  propTypes: {
  },
  render() {
    return <div id="PaneLeftContent" className={cn(
      'flex',
      'flex-column',
      'h100'
    )}>
      <div className="flex-gs-38">
        <div className="h4 mb1">{'goals'}</div>
        <GoalList />
      </div>
      <div className="flex-gs-62">
        <div className="h4 mb1">{'tasks'}</div>
        <TaskList />
      </div>
    </div>
  }
});
