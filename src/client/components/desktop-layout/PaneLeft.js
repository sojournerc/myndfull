
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import GoalPaneConnector from '../../connectors/GoalPaneConnector';
import TaskPaneConnector from '../../connectors/TaskPaneConnector';

export default create({
  displayName: 'PaneLeft',
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return <div id="PaneLeft" className={cn(
      'border-right',
      'h100',
      {
        'flex-gs-20': true
      }
    )}>
      <div id="PaneLeftContent" className={cn(
        'relative',
        'h100'
      )}>
        <div className="absolute top-0 left-0 right-0 bottom-50 border-bottom">
          <GoalPaneConnector />
        </div>
        <div className="absolute top-50 left-0 right-0 bottom-0">
          <TaskPaneConnector />
        </div>
      </div>
    </div>
  }
});
