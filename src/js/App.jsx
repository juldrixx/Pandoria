import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import { ErrorBoundary, Footer, Header, ThemeChanger } from './components';
import routes from './constants/routes';
import Theme from './constants/theme';
import { E404Page, LoginPage, RegisterPage } from './pages';

function App(props) {
  const { dark, logged } = props;

  return (
    <HelmetProvider>
      <ThemeProvider theme={Theme(dark)}>
        <div className={`theme  + ${dark ? 'theme--dark' : 'theme--default'}`}>
          <div id="base">
            <ThemeChanger />
            <ErrorBoundary>
              {logged ? (
                <>
                  <Header />
                  <div className="container">
                    <Routes>
                      {routes.map((route) => (
                        <Route
                          key={route.name}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                      <Route
                        path="/login"
                        element={<Navigate to="/" replace />}
                      />
                      <Route
                        path="/register"
                        element={<Navigate to="/" replace />}
                      />
                      <Route path="*" element={<E404Page />} />
                    </Routes>
                    <Footer />
                  </div>
                </>
              ) : (
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              )}
            </ErrorBoundary>
          </div>
        </div>
      </ThemeProvider>
    </HelmetProvider>
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
