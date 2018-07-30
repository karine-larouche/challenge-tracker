import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CHALLENGES } from '../../routes';
import AppBar from '../../components/AppBar';
import LoadingError from '../../components/LoadingError';
import Description from './Description';
import Entries from './Entries';

const styles = theme => ({
  page: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': { margin: theme.spacing.unit * 4 },
  },
});

class Challenge extends Component {
  componentDidMount = () => {
    this.props.fetchChallenge(this.props.match.params.id);
  };

  render = () => {
    const {
      challenge,
      entries,
      isLoading,
      hasError,
      history,
      classes,
    } = this.props;
    return (
      <React.Fragment>
        <AppBar
          leftComponent={
            <Button
              color="inherit"
              onClick={() => history.push(CHALLENGES.path)}
            >
              Back to list
            </Button>
          }
        />
        <LoadingError isLoading={isLoading} hasError={hasError}>
          <div className={classes.page}>
            <Description challenge={challenge} />
            <Entries entries={entries} />
          </div>
        </LoadingError>
      </React.Fragment>
    );
  };
}

Challenge.propTypes = {
  challenge: PropTypes.object.isRequired,
  entries: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  fetchChallenge: PropTypes.func.isRequired,
};

const mapState = state => ({
  challenge: state.challenge.challenge,
  entries: state.challenge.entries,
  isLoading: state.challenge.isLoading,
  hasError: state.challenge.hasError,
});

const mapDispatch = state => ({
  fetchChallenge: state.challenge.fetchChallenge,
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch,
  )(Challenge),
);
