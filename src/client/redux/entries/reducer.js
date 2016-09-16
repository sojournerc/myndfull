
import Immutable from 'seamless-immutable';

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

const initialState = Immutable({
  entryList: [],
  newEntryText: '',
  isFetching: false,
  isSaving: false
});

export default function entries(state = initialState, { type, payload }) {
  switch (type) {
  case GET_ENTRIES:
    return state.set('isFetching', true);
  case GET_ENTRIES_SUCCESS:
    return state.merge({ isFetching: false, entryList: payload });
  case GET_ENTRIES_FAIL:
    return state.set('isFetching', false);
  case ADD_ENTRY:
    return state.set('isSaving', true );
  case ADD_ENTRY_SUCCESS:
    return state.merge({ newEntryText: '', isSaving: false });
  case ADD_ENTRY_FAIL:
    return state.set('isSaving', false);
  case REMOVE_ENTRY:
    return state;
  case CHANGE_ENTRY_TEXT:
    return state.set('newEntryText', payload)
  default:
    return state;
  }
}
