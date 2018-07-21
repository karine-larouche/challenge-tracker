import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOGIN } from './routes';

const requireAuth = BaseComponent => {
  class Authentication extends Component {
    componentDidMount = () => {
      this.navigateToLoginIfNotAuthenticated();
    };

    componentDidUpdate = () => {
      this.navigateToLoginIfNotAuthenticated();
    };

    navigateToLoginIfNotAuthenticated = () => {
      const {
        isAuthenticated,
        setRequestedPath,
        history,
        location,
      } = this.props;
      if (!isAuthenticated) {
        setRequestedPath(location.pathname);
        history.push(LOGIN.path);
      }
    };

    render = () => {
      const { isAuthenticated, ...baseComponentProps } = this.props;
      return isAuthenticated ? <BaseComponent {...baseComponentProps} /> : null;
    };
  }

  Authentication.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setRequestedPath: PropTypes.func.isRequired,
  };

  const mapState = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  const mapDispatch = state => ({
    setRequestedPath: state.auth.setRequestedPath,
  });

  return connect(
    mapState,
    mapDispatch,
  )(Authentication);
};

export default requireAuth;
