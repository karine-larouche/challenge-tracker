import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOGIN } from './routes';
import CircularProgress from './components/CircularProgress';

const requireAuth = BaseComponent => {
  class Authentication extends Component {
    componentDidMount() {
      this.navigateToLoginIfNotAuthenticated();
    }

    componentDidUpdate() {
      this.navigateToLoginIfNotAuthenticated();
    }

    navigateToLoginIfNotAuthenticated = () => {
      const {
        waitingForInitialCall,
        isAuthenticated,
        setRequestedPath,
        history,
        location,
      } = this.props;
      if (!waitingForInitialCall && !isAuthenticated) {
        setRequestedPath(location.pathname);
        history.push(LOGIN.path);
      }
    };

    render() {
      const {
        waitingForInitialCall,
        isAuthenticated,
        ...baseComponentProps
      } = this.props;
      return waitingForInitialCall ? (
        <CircularProgress />
      ) : isAuthenticated ? (
        <BaseComponent {...baseComponentProps} />
      ) : null;
    }
  }

  Authentication.propTypes = {
    waitingForInitialCall: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    setRequestedPath: PropTypes.func.isRequired,
  };

  const mapState = state => ({
    waitingForInitialCall: state.auth.waitingForInitialAuthenticationCall,
    isAuthenticated: state.auth.isAuthenticated,
  });

  const mapDispatch = dispatch => ({
    setRequestedPath: dispatch.auth.setRequestedPath,
  });

  return connect(
    mapState,
    mapDispatch,
  )(Authentication);
};

export default requireAuth;
