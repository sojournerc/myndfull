
import React from 'react';
import { Provider } from 'react-redux'
import MyndfullConnector from './connectors/MyndfullConnector';

import create from './components/componentFactory';
import { store } from './redux';

const App = create({
  displayName: 'App',
  render() {
    return <div id='App'>
      <Provider store={store} >
        <MyndfullConnector />
      </Provider>
    </div>
  }
});

export default App;
