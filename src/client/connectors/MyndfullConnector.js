
import {
  setMode
} from '../redux/ui/actions';

import create from './connectorFactory';

import Myndfull from '../components/Myndfull';


function mapStateToProps(state) {
  return {
    mode: state.ui.mode,
    dragging: state.dnd.dragging
  }
}

const mapDispatchToProps = (dispatch) => ({
  onModeChange(mode) {
    dispatch(setMode(mode))
  }
})

export default create(Myndfull, mapStateToProps, mapDispatchToProps);
