import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LoadingError from '../../../components/LoadingError';
import AddEntry from './AddEntry';
import DayEntries from './DayEntries';

const Entries = ({
  challengeId,
  entries,
  participants,
  isLoading,
  hasError,
  addEntry,
  deleteEntry,
}) =>
  !challengeId ? null : (
    <Fragment>
      <AddEntry onSubmit={entry => addEntry({ challengeId, entry })} />
      <Card>
        <CardContent>
          <LoadingError isLoading={isLoading} hasError={hasError}>
            {Object.keys(entries).length === 0 ? (
              <Typography color="textSecondary">No entries yet</Typography>
            ) : (
              Object.entries(entries).map(([day, value]) => (
                <DayEntries
                  key={day}
                  day={new Date(day)}
                  dayEntries={value.entries}
                  participants={participants}
                  deleteEntry={entryId => deleteEntry({ challengeId, entryId })}
                />
              ))
            )}
          </LoadingError>
        </CardContent>
      </Card>
    </Fragment>
  );

Entries.propTypes = {
  challengeId: PropTypes.string,
  entries: PropTypes.object.isRequired,
  participants: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  addEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
};

Entries.defaultProps = {
  challengeId: undefined,
};

const mapState = state => ({
  challengeId: state.challenges.currentChallengeId,
  entries: state.entries.entries,
  participants: state.participants.participants,
  isLoading: state.entries.isLoading || state.participants.isLoading,
  hasError: state.entries.hasError || state.participants.hasError,
});

const mapDispatch = dispatch => ({
  addEntry: dispatch.entries.addEntry,
  deleteEntry: dispatch.entries.deleteEntry,
});

export default connect(
  mapState,
  mapDispatch,
)(Entries);
