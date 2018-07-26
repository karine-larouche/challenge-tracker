import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

class TeamMates extends Component {
  componentDidMount = () => {
    this.props.setValues({}, true);
  };

  render = () => <Typography>Coming soon...</Typography>;
}

TeamMates.propTypes = {
  setValues: PropTypes.func.isRequired,
};

export default TeamMates;
