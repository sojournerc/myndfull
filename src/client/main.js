
import polyfill from 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';

const container = document.getElementById('content')
ReactDOM.render(<App />, container);
