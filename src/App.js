import React from 'react';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import models from './models';
import logo from './logo.svg';
import './App.css';

const store = init({
  models,
});

const App = () => (
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  </Provider>
);

export default App;
