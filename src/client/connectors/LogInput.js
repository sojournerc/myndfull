
import create from './connectorFactory';
import TextForm from '../components/common/TextForm';

import {
  changeEntryText,
  postNewEntry,
  fetchEntries
} from '../redux/entries/actions';

const mapStateToProps = (state) => ({
  textArea: true,
  inputValue: state.entries.newEntryText
});

const mapDispatchToProps = (dispatch) => ({
  onAdd(val) {
    dispatch(postNewEntry(val)).then(() => {
      dispatch(fetchEntries()).then(() => {
        console.log('SCROLL TO BOTTOM')
      });
    });
  },
  onInputChange(val) {
    dispatch(changeEntryText(val));
  }
});

export default create(TextForm, mapStateToProps, mapDispatchToProps);
