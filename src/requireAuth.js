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
      const { isAuthenticated, history } = this.props;
      if (!isAuthenticated) {
        history.push(LOGIN.path);
      }
    };

    render = () => {
      const { isAuthenticated, history, ...baseComponentProps } = this.props;
      return isAuthenticated ? <BaseComponent {...baseComponentProps} /> : null;
    };
  }

  Authentication.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  const mapState = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapState)(Authentication);
};

export default requireAuth;
