
import create from './connectorFactory';
import Entry from '../components/core/Entry';

// import {
//   deleteEntry,
//   fetchEntries
// } from '../redux/entries/actions';

const mapStateToProps = (state) => ({
  // TODO -> use this.context instead - since it is pervasive
  isMobile: state.ui.clientInfo.isMobile()
});

const mapDispatchToProps = (dispatch) => ({});

export default create(Entry, mapStateToProps, mapDispatchToProps);
