import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import ErrorHandler from './components/ErrorHandler';
import { LOGIN, CHALLENGES, CHALLENGE } from './routes';
import requireAuth from './requireAuth';
import Login from './pages/Login';
import Challenges from './pages/Challenges';
import Challenge from './pages/Challenge';

const App = () => (
  <ErrorHandler>
    <Switch>
      <Route {...LOGIN} component={Login} />
      <Route {...CHALLENGES} component={requireAuth(Challenges)} />
      <Route {...CHALLENGE} component={requireAuth(Challenge)} />
      <Redirect from="/" to={CHALLENGES.path} />
    </Switch>
  </ErrorHandler>
);

export default App;
