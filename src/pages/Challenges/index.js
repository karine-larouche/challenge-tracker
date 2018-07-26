import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '../../components/AppBar';
import LoadingError from '../../components/LoadingError';
import ChallengeList from './ChallengeList';
import ChallengeCreationDialog from '../ChallengeCreationDialog';

class Challenges extends Component {
  state = {
    createNew: false,
  };

  componentDidMount = () => {
    this.props.getChallenges();
  };

  onAddNewChallenge = () => {
    this.setState({ createNew: true });
  };

  onCancelChallengeCreation = () => {
    this.setState({ createNew: false });
  };

  render = () => {
    const { challenges, isLoading, hasError } = this.props;
    return (
      <React.Fragment>
        <AppBar pageTitle="My Challenges" />
        <LoadingError isLoading={isLoading} hasError={hasError}>
          <ChallengeList
            challenges={challenges}
            onViewChallengeDetails={id =>
              console.log(`view details of challenge ${id}`)
            }
            onAddNewChallenge={this.onAddNewChallenge}
          />
          {this.state.createNew && (
            <ChallengeCreationDialog onClose={this.onCancelChallengeCreation} />
          )}
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
