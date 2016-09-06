
import create from './connectorFactory';
import List from '../components/common/List';

import { TASK } from '../constants/item-types';

import {
  changeTaskText,
  postNewTask,
  deleteTask,
  fetchTasks
} from '../redux/tasks/actions';

const mapStateToProps = (state) => ({
  itemType: TASK,
  items: state.tasks.taskList,
  inputValue: state.tasks.newTaskText
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem(val) {
    dispatch(postNewTask(val)).then(() => {
      dispatch(fetchTasks());
    });
  },
  onRemoveItem(id) {
    dispatch(deleteTask(id)).then(() => {
      dispatch(fetchTasks());
    });
  },
  onInputChange(val) {
    dispatch(changeTaskText(val))
  }
});

export default create(List, mapStateToProps, mapDispatchToProps);
