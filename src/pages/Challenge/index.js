import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '../../components/AppBar';
import LoadingError from '../../components/LoadingError';

class Challenge extends Component {
  componentDidMount = () => {
    this.props.fetchChallenge(this.props.match.params.id);
  };

  render = () => {
    const { challenge, isLoading, hasError } = this.props;
    console.log(isLoading, hasError, challenge);
    return (
      <React.Fragment>
        <AppBar pageTitle={challenge.name || ''} />
        <LoadingError isLoading={isLoading} hasError={hasError}>
          Challenge page
        </LoadingError>
      </React.Fragment>
    );
  };
}

Challenge.propTypes = {
  challenge: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  fetchChallenge: PropTypes.func.isRequired,
};

const mapState = state => ({
  challenge: state.challenge.challenge,
  isLoading: state.challenge.isLoading,
  hasError: state.challenge.hasError,
});

const mapDispatch = state => ({
  fetchChallenge: state.challenge.fetchChallenge,
});

export default connect(
  mapState,
  mapDispatch,
)(Challenge);
