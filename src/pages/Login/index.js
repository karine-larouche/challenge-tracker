import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '../../components/CircularProgress';

const styles = () => ({
  home: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Login extends Component {
  componentDidMount = () => {
    this.navigateToAppIfAuthenticated();
  };

  componentDidUpdate = () => {
    this.navigateToAppIfAuthenticated();
  };

  navigateToAppIfAuthenticated = () => {
    const {
      waitingForInitialCall,
      isAuthenticated,
      requestedPath,
      history,
    } = this.props;
    if (!waitingForInitialCall && isAuthenticated) {
      history.push(requestedPath);
    }
  };

  render = () => {
    const { waitingForInitialCall, signIn, classes } = this.props;
    return waitingForInitialCall ? (
      <CircularProgress />
    ) : (
      <div className={classes.home}>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    );
  };
}

Login.propTypes = {
  waitingForInitialCall: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  requestedPath: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapState = state => ({
  waitingForInitialCall: state.auth.waitingForInitialAuthenticationCall,
  isAuthenticated: state.auth.isAuthenticated,
  requestedPath: state.auth.requestedPath,
});

const mapDispatch = state => ({
  signIn: state.auth.signIn,
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(styles)(Login));
