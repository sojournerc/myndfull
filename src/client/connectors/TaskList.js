
import create from './connectorFactory';
import List from '../components/common/List';

import { TASK } from '../constants/item-types';

const mapStateToProps = (state) => ({
  itemType: TASK,
  items: state.tasks.taskList,
});

const mapDispatchToProps = (dispatch) => ({});

export default create(List, mapStateToProps, mapDispatchToProps);
