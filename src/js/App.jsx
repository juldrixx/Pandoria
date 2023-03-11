import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import { ErrorBoundary, ThemeChanger } from './components';
import routes from './constants/routes';
import Theme from './constants/theme';
import { E404Page, LoginPage, RegisterPage } from './pages';

function App(props) {
  const { dark, logged } = props;

  return (
    <ThemeProvider theme={Theme(dark)}>
      <div className={`theme  + ${dark ? 'theme--dark' : 'theme--default'}`}>
        <div id="base">
          <ThemeChanger />
          <ErrorBoundary>
            {logged ? (
              <div id="container">
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.name}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route
                    path="/register"
                    element={<Navigate to="/" replace />}
                  />
                  <Route path="*" element={<E404Page />} />
                </Routes>
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  logged: state.user.logged,
  rank: state.user.info.roleId,
  dark: state.theme.dark,
});

App.propTypes = {
  logged: PropTypes.bool.isRequired,
  // rank: PropTypes.bool.isRequired,
  dark: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
