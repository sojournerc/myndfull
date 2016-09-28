
import create from './connectorFactory';
import Form from '../components/core/Form';

import TaskModel from '../models/TaskModel';

const mapStateToProps = (state, props) => ({
  workingItem: state[props.ItemClass.API_PATH].workingTask,
  ItemClass: props.ItemClass
});

export default create(TaskForm, mapStateToProps, () => ({}));
