
import create from './connectorFactory';

import Myndfull from '../components/Myndfull';

import { viewportChange } from '../redux/ui/actions';

function mapStateToProps(state) {
  return {
    dragging: state.dnd.dragging,
    clientInfo: state.ui.clientInfo,
    activeView: state.ui.activeView
  }
}

const mapDispatchToProps = (dispatch) => ({
  onViewportChange(viewport) {
    dispatch(viewportChange(viewport));
  }
})

export default create(Myndfull, mapStateToProps, mapDispatchToProps);
