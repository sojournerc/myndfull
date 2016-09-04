
import create from './connectorFactory';
import List from '../components/common/List';

import { GOAL } from '../constants/item-types';

import { changeGoalText } from '../redux/goals/actions';

const mapStateToProps = (state) => ({
  itemType: GOAL,
  items: state.goals.goalList,
  inputValue: state.goals.newGoalText
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem() {

  },
  onInputChange(ev) {
    dispatch(changeGoalText(ev.currentTarget.value))
  }
});

export default create(List, mapStateToProps, mapDispatchToProps);
