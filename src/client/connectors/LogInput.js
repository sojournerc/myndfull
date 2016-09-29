
import create from './connectorFactory';
import TextForm from '../components/common/TextForm';

const mapStateToProps = (state) => ({
  textArea: true,
  inputValue: state.api.entries.workingItem.text
});

const mapDispatchToProps = (dispatch) => ({
  onAdd(val) {
    dispatch(postNewEntry(val)).then(() => {
      dispatch(fetchEntries());
    });
  },
  onInputChange(val) {
    dispatch(changeEntryText(val));
  }
});

export default create(TextForm, mapStateToProps, mapDispatchToProps);
