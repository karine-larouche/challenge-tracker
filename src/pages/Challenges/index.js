import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { CHALLENGE } from '../../routes';
import AppBar from '../../components/AppBar';
import LoadingError from '../../components/LoadingError';
import ChallengeList from './ChallengeList';
import ChallengeCreationDialog from '../ChallengeCreationDialog';

class Challenges extends Component {
  state = {
    createNew: false,
  };

  onViewChallengeDetails = id => {
    this.props.history.push(CHALLENGE.path.replace(':id', id));
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
        <AppBar
          leftComponent={
            <Typography variant="title" color="inherit">
              My Challenges
            </Typography>
          }
        />
        <LoadingError isLoading={isLoading} hasError={hasError}>
          <ChallengeList
            challenges={challenges}
            onViewChallengeDetails={this.onViewChallengeDetails}
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
};

const mapState = state => ({
  challenges: Object.values(state.challenges.challenges),
  isLoading: state.challenges.isLoading,
  hasError: state.challenges.hasError,
});

export default connect(mapState)(Challenges);
