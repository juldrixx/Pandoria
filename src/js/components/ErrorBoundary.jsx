import React, { Component, Fragment } from 'react';
import log from 'loglevel';
import remote from 'loglevel-plugin-remote';
import { Link } from 'react-router-dom';
import { history, title } from '../utils';
import { Helmet } from 'react-helmet';

const customJSON = log => ({
  msg: log.message,
  level: log.level.label,
  stacktrace: log.stacktrace
});

remote.apply(log, { format: customJSON, url: '/logger' });
log.enableAll();

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    history.listen(() => {
      if (this.state.hasError) this.setState({ ...this.state, hasError: false });
    });

    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error, info) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      hasError: true,
      error: error,
      errorInfo: info
    });

    // You can also log error messages to an error reporting service here
    // TODO SEND LOG SOMEWHERE
    // log.error({ error, info });    
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Fragment>
          <Helmet>
            {title('Erreur')}
          </Helmet>

          <div className='error-page'>
            <h1>Une erreur s'est produite</h1>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
            <br />
            <Link to="/">Retourner à la page d'accueil</Link>
          </div>
        </Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;