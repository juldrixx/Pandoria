import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { routes } from './constants';
import { history } from './utils';

const App = () => (
  <Router history={history}>
    <div className="container">
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component} />);
        })}
      </Switch>
    </div>
  </Router>
);

export default App;