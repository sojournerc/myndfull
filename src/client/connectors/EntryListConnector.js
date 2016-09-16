
import create from './connectorFactory';
import EntryList from '../components/core/EntryList';

const mapStateToProps = (state) => ({
  entries: state.entries.entryList
});

const mapDispatchToProps = (dispatch) => ({});

export default create(EntryList, mapStateToProps, mapDispatchToProps);
