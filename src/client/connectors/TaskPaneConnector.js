
import create from './connectorFactory';
import TaskPane from '../components/core/TaskPane';
import { store } from '../redux';
import { TASK } from '../constants/item-types';

import { showForm, hideForm } from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  showingForm: state.ui.showingForm === TASK
});

const mapDispatchToProps = (dispatch) => ({
  onShowForm() {
    dispatch(showForm(TASK));
  },
  onHideForm() {
    dispatch(hideForm());
  }
});

export default create(TaskPane, mapStateToProps, mapDispatchToProps);
