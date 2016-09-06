
import create from '../actionFactory';
import createFetch from '../fetchFactory';
import { store } from '../index';

import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL,
  ADD_ENTRY,
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  REMOVE_ENTRY,
  REMOVE_ENTRY_SUCCESS,
  REMOVE_ENTRY_FAIL,
  CHANGE_ENTRY_TEXT
} from '../../constants/action-types';

export function changeEntryText(val) {
  return create(CHANGE_ENTRY_TEXT, val)
}

/**
 * ENTRY REMOVAL
 */
export function removeEntry(id) {
  return create(REMOVE_ENTRY, id);
}
export function removeEntrySuccess() {
  return create(REMOVE_ENTRY_SUCCESS);
}
export function removeEntryFail() {
  return create(REMOVE_ENTRY_FAIL);
}
export function deleteEntry(id) {
  return createFetch({
    url: `/api/entries/${id}`,
    method: 'DELETE',
    start: removeEntry,
    success: removeEntrySuccess,
    fail: removeEntryFail
  })
}

/**
 * ENTRY FETCHING
 */
export function getEntrys() {
  return create(GET_ENTRIES);
}
export function getEntrysSuccess(entries) {
  return create(GET_ENTRIES_SUCCESS, entries);
}
export function getEntrysFail(res) {
  return create(GET_ENTRIES_FAIL, res);
}
export function fetchEntries() {
  return createFetch({
    url: `/api/entries`,
    method: 'GET',
    start: getEntrys,
    success: getEntrysSuccess,
    fail: getEntrysFail
  });
}

/**
 * ENTRY ADDING
 */
export function addEntry() {
  return create(ADD_ENTRY)
}
export function addEntrySuccess(got) {
  return create(ADD_ENTRY_SUCCESS, got);
}
export function addEntryFail(res) {
  return create(ADD_ENTRY_FAIL, res);
}
export function postNewEntry(text) {
  const entry = {
    text
  };
  return createFetch({
    url: `/api/entries`,
    method: 'POST',
    body: entry,
    start: addEntry,
    success: addEntrySuccess,
    fail: addEntryFail
  });
}
