
import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerReducer } from 'react-router-redux';

import ui from './ui/reducer';
import api from './api/reducer';
import dnd from './dnd/reducer';

const loggerMiddleware = createLogger({
  collapsed: true
});

export const reducer = combineReducers({
  routing: routerReducer,
  ui,
  api,
  dnd
});

export const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);
