
import create from './connectorFactory';
import List from '../components/common/List';

import { TASK } from '../constants/item-types';

import { changeTaskText } from '../redux/tasks/actions';

const mapStateToProps = (state) => ({
  itemType: TASK,
  items: state.tasks.taskList,
  inputValue: state.tasks.newTaskText
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem() {

  },
  onInputChange(ev) {
    dispatch(changeTaskText(ev.currentTarget.value))
  }
});

export default create(List, mapStateToProps, mapDispatchToProps);
