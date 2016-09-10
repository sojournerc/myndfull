
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import GoalPaneConnector from '../../connectors/GoalPaneConnector';
import TaskPaneConnector from '../../connectors/TaskPaneConnector';

export default create({
  displayName: 'PaneLeftContent',
  propTypes: {
  },
  render() {
    return <div id="PaneLeftContent" className={cn(
      'flex',
      'flex-column',
      'justify-between',
      'h100'
    )}>
      <div className="flex-s-50">
        <GoalPaneConnector />
      </div>
      <div className="flex-s-50">
        <TaskPaneConnector />
      </div>
    </div>
  }
});
