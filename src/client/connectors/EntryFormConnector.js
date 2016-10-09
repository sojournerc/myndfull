

import create from './connectorFactory';
import EntryForm from '../components/core/EntryForm';

const mapStateToProps = (state) => ({
  workingItem: state.api.entries.workingItem,
  isSaving: state.api.entries.isSaving
}); 

const mapDispatchToProps = (dispatch) => ({});

export default create(EntryForm, mapStateToProps, mapDispatchToProps);
