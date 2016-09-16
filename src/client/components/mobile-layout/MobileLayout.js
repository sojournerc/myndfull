
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import MAIN_VIEWS, {
  LOG_VIEW,
  GOAL_VIEW,
  TASK_VIEW
} from '../../constants/main-views';

import Header from '../common/Header';
import TabBar from '../common/TabBar';

import EntryPane from '../core/EntryPane';
import GoalPaneConnector from '../../connectors/GoalPaneConnector';
import TaskPaneConnector from '../../connectors/TaskPaneConnector';

export default create({
  displayName: 'MobileLayout',
  propTypes: {
    activeView: React.PropTypes.string.isRequired,
    onViewChange: React.PropTypes.func.isRequired
  },
  render() {
    const { activeView, onViewChange } = this.props;
    return <div id="MobileLayout" className={cn(
    )}>
      <Header isMobile={true} activeView={ activeView } onViewChange={ onViewChange } />
      <div id="BodyInner">
        <div className={cn(
          'h100',
          'w100'
        )}>
          {(() => {
            switch (activeView) {
            case LOG_VIEW:
              return <EntryPane />;
            case GOAL_VIEW:
              return <GoalPaneConnector />;
            case TASK_VIEW:
              return <TaskPaneConnector />;
            }
          })()}
        </div>
      </div>
    </div>
  }
});
