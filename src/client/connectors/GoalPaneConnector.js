
import create from './connectorFactory';
import Pane from '../components/common/Pane';

import GoalModel from '../models/GoalModel';

import { showForm, hideForm } from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  showingForm: state.ui.showingForm === GoalModel.TYPE,
  ItemClass: GoalModel
});

const mapDispatchToProps = (dispatch) => ({
  onShowForm() {
    dispatch(showForm(GoalModel.TYPE));
  },
  onHideForm() {
    dispatch(hideForm());
  }
});

export default create(Pane, mapStateToProps, mapDispatchToProps);
