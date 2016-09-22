
import create from './connectorFactory';
import GoalForm from '../components/core/GoalForm';

import {
  onPropChange,
  postNewGoal,
  fetchGoals
} from '../redux/goals/actions';

import {
  hideForm
} from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  formValues: state.goals.formValues
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem(item) {
    dispatch(postNewGoal(item)).then(() => {
      dispatch(hideForm());
      dispatch(fetchGoals());
    });
  },
  onPropChange(val) {
    dispatch(onPropChange(val))
  }
});

export default create(GoalForm, mapStateToProps, mapDispatchToProps);
