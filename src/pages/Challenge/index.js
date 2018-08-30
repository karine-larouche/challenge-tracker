import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { CHALLENGES } from '../../routes';
import AppBar from '../../components/AppBar';
import Description from './Description';
import Entries from './Entries';
import Calendar from './Calendar';
import ProgressGraph from './ProgressGraph';

const styles = theme => ({
  container: {
    margin: theme.spacing.grid,
  },
});

class Challenge extends Component {
  componentDidMount = () => {
    this.props.getEntries(this.challengeId());
    this.props.getParticipants(this.challengeId());
  };

  challengeId = () => this.props.match.params.id;

  render = () => {
    const {
      challenges,
      isLoadingChallenges,
      hasErrorChallenges,
      entries,
      isLoadingEntries,
      hasErrorEntries,
      participants,
      isLoadingParticipants,
      hasErrorParticipants,
      addEntry,
      deleteEntry,
      history,
      classes,
      theme,
    } = this.props;
    const challengeId = this.challengeId();
    return (
      <Fragment>
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
        <div className={classes.container}>
          <Grid container spacing={theme.spacing.grid} justify="center">
            <Grid item xs={12} sm={6} md={8} lg={6}>
              <Grid container spacing={theme.spacing.grid}>
                <Grid item xs={12} md={8}>
                  <Description
                    challenge={challenges[challengeId]}
                    isLoading={isLoadingChallenges}
                    hasError={hasErrorChallenges}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Calendar
                    entries={entries}
                    challenge={challenges[challengeId]}
                    isLoading={isLoadingEntries || isLoadingChallenges}
                    hasError={hasErrorEntries || hasErrorChallenges}
                  />
                </Grid>
                <Grid item xs={12}>
                  {Object.keys(entries).length > 0 && (
                    <ProgressGraph entries={entries} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Entries
                entries={entries}
                participants={participants}
                isLoading={isLoadingEntries || isLoadingParticipants}
                hasError={hasErrorEntries || hasErrorParticipants}
                onAdd={entry => addEntry({ challengeId, entry })}
                onDelete={entryId => deleteEntry({ challengeId, entryId })}
              />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  };
}

Challenge.propTypes = {
  challenges: PropTypes.object.isRequired,
  isLoadingChallenges: PropTypes.bool.isRequired,
  hasErrorChallenges: PropTypes.bool.isRequired,
  entries: PropTypes.object.isRequired,
  isLoadingEntries: PropTypes.bool.isRequired,
  hasErrorEntries: PropTypes.bool.isRequired,
  participants: PropTypes.object.isRequired,
  isLoadingParticipants: PropTypes.bool.isRequired,
  hasErrorParticipants: PropTypes.bool.isRequired,
  getEntries: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  getParticipants: PropTypes.func.isRequired,
};

const mapState = state => ({
  challenges: state.challenges.challenges,
  isLoadingChallenges: state.challenges.isLoading,
  hasErrorChallenges: state.challenges.hasError,
  entries: state.entries.entries,
  isLoadingEntries: state.entries.isLoading,
  hasErrorEntries: state.entries.hasError,
  participants: state.participants.participants,
  isLoadingParticipants: state.participants.isLoading,
  hasErrorParticipants: state.participants.hasError,
});

const mapDispatch = dispatch => ({
  getEntries: dispatch.entries.getEntries,
  addEntry: dispatch.entries.addEntry,
  deleteEntry: dispatch.entries.deleteEntry,
  getParticipants: dispatch.participants.getParticipants,
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapState,
    mapDispatch,
  )(Challenge),
);
