
import create from './connectorFactory';
import GoalPane from '../components/core/GoalPane';

import { GOAL } from '../constants/item-types';

import { showForm, hideForm } from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  showingForm: state.ui.showingForm === GOAL
});

const mapDispatchToProps = (dispatch) => ({
  onShowForm() {
    dispatch(showForm(GOAL));
  },
  onHideForm() {
    dispatch(hideForm());
  }
});

export default create(GoalPane, mapStateToProps, mapDispatchToProps);
