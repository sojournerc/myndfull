
import React from 'react';
import { Provider } from 'react-redux'
import MyndfullConnector from './connectors/MyndfullConnector';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import create from './components/componentFactory';
import { store } from './redux';

import theme from './theme';
const muiTheme = getMuiTheme(theme);

const App = create({
  displayName: 'App',
  render() {
    return <div id='App'>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store} >
          <MyndfullConnector />
        </Provider>
      </MuiThemeProvider>
    </div>
  }
});

export default App;
