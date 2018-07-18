import React from 'react';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import models from './models';
import './App.css';

const store = init({
  models,
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <div>Match</div>} />
        <Route render={() => <div>Miss</div>} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
