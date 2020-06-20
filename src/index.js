import React from 'react';
import { render } from 'react-dom';
import store from './js/store/index';
import { Provider } from 'react-redux';
import App from './js/App';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './assets/stylesheets/main.scss';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

module.hot.accept();