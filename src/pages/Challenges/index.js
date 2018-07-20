import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class Challenges extends Component {
  componentDidMount = () => {
    this.props.getChallenges();
  };

  render = () => {
    const { challenges, isLoading, hasError, signOut } = this.props;
    console.log({ isLoading, hasError, challenges });
    return (
      <React.Fragment>
        <div>Challenge list page</div>
        <Button onClick={signOut}>Sign out</Button>
      </React.Fragment>
    );
  };
}

Challenges.propTypes = {
  challenges: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  getChallenges: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapState = state => ({
  challenges: state.challenges.challenges,
  isLoading: state.challenges.isLoading,
  hasError: state.challenges.hasError,
});

const mapDispatch = state => ({
  getChallenges: state.challenges.fetchChallenges,
  signOut: state.auth.signOut,
});

export default connect(
  mapState,
  mapDispatch,
)(Challenges);
