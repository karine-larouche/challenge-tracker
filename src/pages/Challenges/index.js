import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '../../components/AppBar';
import LoadingError from '../../components/LoadingError';
import ChallengeList from './ChallengeList';

class Challenges extends Component {
  componentDidMount = () => {
    this.props.getChallenges();
  };

  render = () => {
    const { challenges, isLoading, hasError } = this.props;
    console.log({ isLoading, hasError, challenges });
    return (
      <React.Fragment>
        <AppBar pageTitle="My Challenges" />
        <LoadingError isLoading={isLoading} hasError={hasError}>
          <ChallengeList
            challenges={challenges}
            onViewChallengeDetails={id =>
              console.log(`view details of challenge ${id}`)
            }
            onAddNewChallenge={() => console.log('add new challenge')}
          />
        </LoadingError>
      </React.Fragment>
    );
  };
}

Challenges.propTypes = {
  challenges: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  getChallenges: PropTypes.func.isRequired,
};

const mapState = state => ({
  challenges: state.challenges.challenges,
  isLoading: state.challenges.isLoading,
  hasError: state.challenges.hasError,
});

const mapDispatch = state => ({
  getChallenges: state.challenges.fetchChallenges,
});

export default connect(
  mapState,
  mapDispatch,
)(Challenges);
