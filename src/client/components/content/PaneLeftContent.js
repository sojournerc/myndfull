
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { store } from '../../redux';

import { fetchGoals } from '../../redux/goals/actions';
import { fetchTasks } from '../../redux/tasks/actions';

import GoalList from '../../connectors/GoalList';
import TaskList from '../../connectors/TaskList';

export default create({
  displayName: 'PaneLeftContent',
  propTypes: {
  },
  componentWillMount() {
    store.dispatch(fetchGoals());
    store.dispatch(fetchTasks());
  },
  render() {
    return <div id="PaneLeftContent" className={cn(
      'flex',
      'flex-column',
      'justify-between',
      'h100'
    )}>
      <div className="flex-s-50 overflow-auto">
        <div className="h4 mb1 center">{'GOALS'}</div>
        <GoalList />
      </div>
      <div className="flex-s-50 overflow-auto">
        <div className="h4 mb1 center">{'TASKS'}</div>
        <TaskList />
      </div>
    </div>
  }
});
