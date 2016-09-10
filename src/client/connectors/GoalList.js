
import create from './connectorFactory';
import List from '../components/common/List';

import { GOAL } from '../constants/item-types';

const mapStateToProps = (state) => ({
  itemType: GOAL,
  items: state.goals.goalList
});

const mapDispatchToProps = (dispatch) => ({});

export default create(List, mapStateToProps, mapDispatchToProps);
