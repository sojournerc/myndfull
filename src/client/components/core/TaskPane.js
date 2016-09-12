
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import { store } from '../../redux';
import { fetchTasks } from '../../redux/tasks/actions';

import { AddButton, CloseButton } from '../common/Buttons';
import TaskList from '../../connectors/TaskList';
import TaskCreator from '../../connectors/TaskCreator';

export default create({
  displayName: 'TaskPane',
  propTypes: {
    onShowForm: React.PropTypes.func.isRequired,
    onHideForm: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    store.dispatch(fetchTasks());
  },
  render() {
    const { showingForm, onShowForm, onHideForm } = this.props;
    return <div className={cn(
      'flex',
      'flex-column',
      'h100',
      'border-box',
      'pb1'
    )}>
      <div className="mb1 flex-item">
        <div className="flex flex-row justify-between items-center px2">
          <span className="h4 flex-item">{'TASKS'}</span>
          <span className="flex-item">
            {showingForm &&
            <CloseButton onClick={onHideForm} />
            ||
            <AddButton onClick={onShowForm} />
            }
          </span>
        </div>
      </div>
      <div className="flex-s-50 overflow-auto px2">
        {showingForm &&
        <TaskCreator />
        ||
        <TaskList />
        }
      </div>
    </div>
  }
});
