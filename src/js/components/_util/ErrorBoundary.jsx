import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import Images from '../../constants/images';

log.enableAll();

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    log.error({ error, info });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div id="content">
          <div id="error-page">
            <img src={Images.logo.squidflowKO} alt="KO" />
            <span className="primary">Oh! Something went wrong...</span>
            <span className="secondary">Please contact an administrator</span>
          </div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorBoundary;
