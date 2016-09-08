
import create from './connectorFactory';
import List from '../components/common/List';

import { GOAL } from '../constants/item-types';

import {
  changeGoalText,
  postNewGoal,
  fetchGoals
} from '../redux/goals/actions';

const mapStateToProps = (state) => ({
  itemType: GOAL,
  items: state.goals.goalList,
  inputValue: state.goals.newGoalText
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem(val) {
    dispatch(postNewGoal(val)).then(() => {
      dispatch(fetchGoals());
    });
  },
  onInputChange(val) {
    dispatch(changeGoalText(val))
  }
});

export default create(List, mapStateToProps, mapDispatchToProps);
