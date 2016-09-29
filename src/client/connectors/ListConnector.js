
import create from './connectorFactory';
import List from '../components/common/List';

const mapStateToProps = (state, props) => ({
  items: state.api[props.ItemClass.API_PATH].items,
  itemsLoading: state.api[props.ItemClass.API_PATH].isFetching
});

const mapDispatchToProps = (dispatch) => ({});

export default create(List, mapStateToProps, mapDispatchToProps);
