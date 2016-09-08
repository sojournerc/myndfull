
import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import ui from './ui/reducer';
import goals from './goals/reducer';
import tasks from './tasks/reducer';
import entries from './entries/reducer';
import dnd from './dnd/reducer';

const loggerMiddleware = createLogger({
  collapsed: true
});

export const reducer = combineReducers({
  ui,
  goals,
  tasks,
  entries,
  dnd
});

export const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
    // loggerMiddleware
  )
);
