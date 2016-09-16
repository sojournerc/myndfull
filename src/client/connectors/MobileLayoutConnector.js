
import create from './connectorFactory';
import MobileLayout from '../components/mobile-layout/MobileLayout';

import { activeViewChange } from '../redux/ui/actions';

const mapStateToProps = (state) => ({
  activeView: state.ui.activeView
});

const mapDispatchToProps = (dispatch) => ({
  onViewChange(view) {
    dispatch(activeViewChange(view))
  }
});

export default create(MobileLayout, mapStateToProps, mapDispatchToProps);
