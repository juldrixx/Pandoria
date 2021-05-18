import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './constants';
import { history } from './utils';
import { Header, Footer, ThemeChanger, ErrorBoundary } from './components';
import { LoginPage, RegisterPage, E404Page } from './pages';
import { connect } from 'react-redux';
import { AbilityContext } from './constants/abilityContext';
import { ABILITIES } from './constants/ability';

class AppRouter extends Component {

  getAbilities() {
    return (this.props.rank) ? ABILITIES[this.props.rank] : {};
  }

  render() {
    const r = (this.props.logged) ? (
      <Fragment>
        <AbilityContext.Provider value={this.getAbilities()}>
          <Header />

          <div className='container'>
            <ErrorBoundary>
              <Switch>
                {routes.map((route, index) => {
                  return (
                    (route.allowed.indexOf(this.props.rank) != -1) &&
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component} />);
                })}

                <Redirect from='/login' to='/' />
                <Route component={E404Page} />
              </Switch>
            </ErrorBoundary>
          </div>

          <Footer />
        </AbilityContext.Provider>
      </Fragment >
    ) : (
        <Fragment>
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route component={LoginPage} />
          </Switch>
        </Fragment>
      )

    return (
      <div className={'theme ' + (this.props.dark ? 'theme--dark' : 'theme--default')}>
        <div className='base'>
          <ThemeChanger />
          <Router history={history}>
            {r}
          </Router>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.user.logged,
    rank: state.user.info.roleId,
    dark: state.theme.dark,
  };
}

export default connect(mapStateToProps)(AppRouter);