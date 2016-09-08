
import create from './connectorFactory';
import Task from '../components/core/Task'

import {
  deleteTask,
  fetchTasks
} from '../redux/tasks/actions';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  onRemoveItem(id) {
    dispatch(deleteTask(id)).then(() => {
      dispatch(fetchTasks());
    });
  },
});

export default create(Task, mapStateToProps, mapDispatchToProps);
