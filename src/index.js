import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './stylesheets/main.scss';
import App from './js/App';
import store from './js/store/index';
import './js/i18n';

let container = null;
document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
  }
});

if (module && module.hot) module.hot.accept();
