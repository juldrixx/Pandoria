import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './constants';
import { history } from './utils';
import { Header, Footer } from './components';
import { LoginPage, E404Page } from './pages';
import { connect } from 'react-redux';

class AppRouter extends Component {

  render() {
    const r = (this.props.logged) ? (
      <Fragment>
        <Header />

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

            <Redirect from="/login" to="/" />
            <Route component={E404Page} />
          </Switch>
        </div>

        <Footer />
      </Fragment>
    ) : (
        <Fragment>
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route component={LoginPage} />
          </Switch>
        </Fragment>
      )

    return (
      <Router history={history}>
        {r}
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.user.logged,
  };
}

export default connect(mapStateToProps)(AppRouter);