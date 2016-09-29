
import create from './connectorFactory';
import Pane from '../components/common/Pane';

import TaskModel from '../models/TaskModel';

import { showForm, hideForm } from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  showingForm: state.ui.showingForm === TaskModel.TYPE,
  ItemClass: TaskModel
});

const mapDispatchToProps = (dispatch) => ({
  onShowForm() {
    dispatch(showForm(TaskModel.TYPE));
  },
  onHideForm() {
    dispatch(hideForm());
  }
});

export default create(Pane, mapStateToProps, mapDispatchToProps);
