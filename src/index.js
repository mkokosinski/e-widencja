import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';
import store from './store';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './features/layout/Theme';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={{ ...darkTheme }}>
        <Router basename={'/'}>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
    <div id='portals'></div>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
