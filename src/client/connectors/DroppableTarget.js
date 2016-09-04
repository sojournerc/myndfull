
import create from './connectorFactory';
import Target from '../components/controls/Target';

import {
  mapStateToProps,
  mapDispatchToProps
} from './dnd/droppable';

export default create(Target, mapStateToProps, mapDispatchToProps);
