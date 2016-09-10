
import create from './connectorFactory';

import Myndfull from '../components/Myndfull';


function mapStateToProps(state) {
  return {
    dragging: state.dnd.dragging
  }
}

const mapDispatchToProps = (dispatch) => ({})

export default create(Myndfull, mapStateToProps, mapDispatchToProps);
