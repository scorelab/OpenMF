import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import {ThemeProvider} from '@material-ui/core';
import {Provider} from 'react-redux';
import theme from './theme';
import store from './store/store';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router >
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>
  </ThemeProvider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
