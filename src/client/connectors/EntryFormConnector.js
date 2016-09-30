

import create from './connectorFactory';
import EntryForm from '../components/core/EntryForm';

const mapStateToProps = (state) => ({
  workingItem: state.api.entries.workingItem
}); 

const mapDispatchToProps = (dispatch) => ({});

export default create(EntryForm, mapStateToProps, mapDispatchToProps);
