
import create from './connectorFactory';
import Target from '../components/core/Target';

import {
  mapStateToProps,
  mapDispatchToProps
} from './dnd/droppable';

export default create(Target, mapStateToProps, mapDispatchToProps);
