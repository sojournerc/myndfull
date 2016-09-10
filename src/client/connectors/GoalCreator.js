
import create from './connectorFactory';
import GoalForm from '../components/core/GoalForm';

import {
  changeGoalText,
  postNewGoal,
  fetchGoals
} from '../redux/goals/actions';

import {
  hideForm
} from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  inputValue: state.goals.newGoalText
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem(val) {
    dispatch(postNewGoal(val)).then(() => {
      dispatch(hideForm());
      dispatch(fetchGoals());
    });
  },
  onInputChange(val) {
    dispatch(changeGoalText(val))
  }
});

export default create(GoalForm, mapStateToProps, mapDispatchToProps);
