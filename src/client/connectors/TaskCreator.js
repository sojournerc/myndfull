

import create from './connectorFactory';
import TaskForm from '../components/core/TaskForm';

import {
  onFormChange,
  postNewTask,
  fetchTasks
} from '../redux/tasks/actions';

import {
  hideForm
} from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  formValues: state.tasks.formValues
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem(val) {
    dispatch(postNewTask(val)).then(() => {
      dispatch(hideForm());
      dispatch(fetchTasks());
    });
  },
  onFormChange(val) {
    dispatch(onFormChange(val))
  }
});

export default create(TaskForm, mapStateToProps, mapDispatchToProps);
