
import React from 'react';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Myndfull from './Myndfull';
import create from './componentFactory';

import HomePage from './pages/HomePage';
import LogPage from './pages/LogPage';
import GoalPage from './pages/GoalPage';
import TaskPage from './pages/TaskPage';

import { store } from '../state';

import theme from '../theme';

const muiTheme = getMuiTheme(theme);

const App = create({
  displayName: 'App',
  render() {
    return <div id='App'>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store} >
          <Router history={syncHistoryWithStore(browserHistory, store)}>
            <Route path="/" component={Myndfull}>
              <IndexRedirect to="/home" />
              <Route path="home" component={HomePage} />
              <Route path="log" component={LogPage}/>
              <Route path="goals" component={GoalPage} />
              <Route path="tasks" component={TaskPage}/>
            </Route>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </div>
  }
});

export default App;
