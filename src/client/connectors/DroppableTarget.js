
import create from './connectorFactory';
import Target from '../components/common/Target';

import {
  mapStateToProps,
  mapDispatchToProps
} from './dnd/droppable';

export default create(Target, mapStateToProps, mapDispatchToProps);
