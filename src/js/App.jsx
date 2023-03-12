import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';
import { ErrorBoundary, Footer, Header, ThemeChanger } from './components';
import routes from './constants/routes';
import Theme from './constants/theme';
import { E404Page, LoginPage, RegisterPage } from './pages';
import { AbilityContext } from './constants/abilityContext';
import { ABILITIES } from './constants/ability';

function App(props) {
  const { dark, rank, logged } = props;

  const queryClient = new QueryClient();
  const getAbilities = () => (rank === null ? ABILITIES[rank] : {});

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HelmetProvider>
        <ThemeProvider theme={Theme(dark)}>
          <div
            className={`theme  + ${dark ? 'theme--dark' : 'theme--default'}`}
          >
            <div id="base">
              <ThemeChanger />
              <ErrorBoundary>
                {logged ? (
                  <AbilityContext.Provider value={getAbilities()}>
                    <Header />
                    <div className="container">
                      <Routes>
                        {routes.map(
                          (route) =>
                            route.allowed.indexOf(rank) !== -1 && (
                              <Route
                                key={route.name}
                                path={route.path}
                                element={route.element}
                              />
                            )
                        )}
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
                  </AbilityContext.Provider>
                ) : (
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="*"
                      element={<Navigate to="/login" replace />}
                    />
                  </Routes>
                )}
              </ErrorBoundary>
            </div>
          </div>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

const mapStateToProps = (state) => ({
  logged: state.user.logged,
  rank: state.user.info.roleId,
  dark: state.theme.dark,
});

App.defaultProps = {
  rank: null,
};

App.propTypes = {
  logged: PropTypes.bool.isRequired,
  rank: PropTypes.number,
  dark: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
