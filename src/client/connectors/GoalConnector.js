
import create from './connectorFactory';
import Goal from '../components/core/Goal';

import {
  deleteGoal,
  fetchGoals
} from '../redux/goals/actions';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  onRemoveItem(id) {
    dispatch(deleteGoal(id)).then(() => {
      dispatch(fetchGoals());
    });
  },
});

export default create(Goal, mapStateToProps, mapDispatchToProps);
