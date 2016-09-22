
import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL,
  ADD_ENTRY,
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  REMOVE_ENTRY,
  CHANGE_ENTRY_TEXT
} from '../../constants/action-types';

const initialState = Object.freeze({
  entryList: [],
  newEntryText: '',
  isFetching: false,
  isSaving: false
});

export default function entries(state = initialState, { type, payload }) {
  switch (type) {
  case GET_ENTRIES:
    return Object.assign({}, state, { 'isFetching': true });
  case GET_ENTRIES_SUCCESS:
    return Object.assign({}, state, { isFetching: false, entryList: payload });
  case GET_ENTRIES_FAIL:
    return Object.assign({}, state, { 'isFetching': false });
  case ADD_ENTRY:
    return Object.assign({}, state, { 'isSaving': true });
  case ADD_ENTRY_SUCCESS:
    return Object.assign({}, state, { newEntryText: '', isSaving: false });
  case ADD_ENTRY_FAIL:
    return Object.assign({}, state, { 'isSaving': false });
  case REMOVE_ENTRY:
    return state;
  case CHANGE_ENTRY_TEXT:
    return Object.assign({}, state, { 'newEntryText': payload })
  default:
    return state;
  }
}
