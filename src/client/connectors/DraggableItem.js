
import create from './connectorFactory';
import Item from '../components/common/ListItem';

import { mapStateToProps, mapDispatchToProps } from './dnd/draggable';

function _mapStateToProps(state) {
  return Object.assign({}, mapStateToProps(state), {
    isMobile: state.ui.clientInfo.isMobile()
  })
}

function _mapDispatchToProps(dispatch) {
  return Object.assign({}, mapDispatchToProps(dispatch), {

  })
}

export default create(Item, _mapStateToProps, _mapDispatchToProps);
