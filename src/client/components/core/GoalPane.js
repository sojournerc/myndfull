
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import { store } from '../../redux';
import { fetchGoals } from '../../redux/goals/actions';

import { AddButton, CloseButton } from '../common/Buttons';
import GoalList from '../../connectors/GoalList';
import GoalCreator from '../../connectors/GoalCreator';

export default create({
  displayName: 'GoalPane',
  propTypes: {
    onShowForm: React.PropTypes.func.isRequired,
    onHideForm: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    store.dispatch(fetchGoals());
  },
  render() {
    const { showingForm, onShowForm, onHideForm } = this.props;
    return <div className={cn(
    )}>
      <div className="mb1 flex-item">
        <div className="flex flex-row justify-between items-center">
          <span className="h4 flex-item">{'GOALS'}</span>
          <span className="flex-item">
            {showingForm &&
            <CloseButton onClick={onHideForm} />
            ||
            <AddButton onClick={onShowForm} />
            }
          </span>
        </div>
      </div>
      <div className="flex-s-50 overflow-auto">
        {showingForm &&
        <GoalCreator />
        ||
        <GoalList />
        }
      </div>
    </div>
  }
});
