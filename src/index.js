import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { init } from '@rematch/core';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
import { initializeFirebase } from './firebase/initialization';
import App from './App';
import models from './models';
import theme from './theme';

const store = init({
  models,
});

initializeFirebase(store);

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
