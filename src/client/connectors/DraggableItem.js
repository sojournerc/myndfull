
import create from './connectorFactory';
import Item from '../components/common/ListItem';

import { mapStateToProps, mapDispatchToProps } from './dnd/draggable';

export default create(Item, mapStateToProps, mapDispatchToProps);
