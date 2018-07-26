import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { LOGIN, CHALLENGES } from './routes';
import requireAuth from './requireAuth';
import Login from './pages/Login';
import Challenges from './pages/Challenges';

const App = () => (
  <Switch>
    <Route {...LOGIN} component={Login} />
    <Route {...CHALLENGES} component={requireAuth(Challenges)} />
    <Redirect from="/" to={CHALLENGES.path} />
  </Switch>
);

export default App;
