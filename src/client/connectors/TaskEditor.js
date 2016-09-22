
import create from './connectorFactory';
import TaskForm from '../components/core/TaskForm';

import TaskModel from '../models/TaskModel';

const mapStateToProps = (state) => ({
  workingItem: state.tasks.workingTask,
  ModelClass: TaskModel
});

export default create(TaskForm, mapStateToProps, () => ({}));
