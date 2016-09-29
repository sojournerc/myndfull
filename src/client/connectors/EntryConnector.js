
import create from './connectorFactory';
import Entry from '../components/core/Entry';

// import {
//   deleteEntry,
//   fetchEntries
// } from '../redux/entries/actions';

const mapStateToProps = (state) => ({
  isMobile: state.ui.clientInfo.isMobile()
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveItem(id) {
    // dispatch(deleteEntry(id)).then(() => {
    //   dispatch(fetchEntries());
    // });
  }
});

export default create(Entry, mapStateToProps, mapDispatchToProps);
