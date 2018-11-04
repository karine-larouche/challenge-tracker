import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import MobileVersion from './MobileVersion';
import DesktopVersion from './DesktopVersion';

class Challenge extends Component {
  componentDidMount() {
    this.props.setCurrentChallengeId(this.props.match.params.id);
  }

  render() {
    const { width, history } = this.props;
    return width === 'xs' ? (
      <MobileVersion history={history} />
    ) : (
      <DesktopVersion history={history} />
    );
  }
}

Challenge.propTypes = {
  width: PropTypes.string.isRequired,
  setCurrentChallengeId: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => ({
  setCurrentChallengeId: dispatch.challenges.setCurrentChallengeId,
});

export default connect(
  null,
  mapDispatch,
)(withWidth()(Challenge));
