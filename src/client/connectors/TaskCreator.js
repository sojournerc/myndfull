

import create from './connectorFactory';
import TaskForm from '../components/core/TaskForm';

import {
  changeTaskText,
  postNewTask,
  fetchTasks
} from '../redux/tasks/actions';

import {
  hideForm
} from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  inputValue: state.tasks.newTaskText
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem(val) {
    dispatch(postNewTask(val)).then(() => {
      dispatch(hideForm());
      dispatch(fetchTasks());
    });
  },
  onInputChange(val) {
    dispatch(changeTaskText(val))
  }
});

export default create(TaskForm, mapStateToProps, mapDispatchToProps);
