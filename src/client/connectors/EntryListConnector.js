
import create from './connectorFactory';
import EntryList from '../components/core/EntryList';

const mapStateToProps = (state) => ({
  entries: state.api.entries.items
});

const mapDispatchToProps = (dispatch) => ({});

export default create(EntryList, mapStateToProps, mapDispatchToProps);
