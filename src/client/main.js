
import polyfill from 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const container = document.getElementById('content')
ReactDOM.render(<App />, container);
