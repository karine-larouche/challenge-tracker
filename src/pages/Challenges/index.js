import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Challenges = ({ signOut }) => (
  <React.Fragment>
    <div>Challenge list page</div>
    <Button onClick={signOut}>Sign out</Button>
  </React.Fragment>
);

Challenges.propTypes = {
  signOut: PropTypes.func.isRequired,
};

const mapDispatch = state => ({
  signOut: state.auth.signOut,
});

export default connect(
  null,
  mapDispatch,
)(Challenges);
