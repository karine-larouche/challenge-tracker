import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LoadingError from '../../../components/LoadingError';
import AddEntry from './AddEntry';
import DayEntries from './DayEntries';

const Entries = ({
  entries,
  participants,
  isLoading,
  hasError,
  onAdd,
  onDelete,
}) => (
  <Fragment>
    <AddEntry onSubmit={onAdd} />
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
                deleteEntry={onDelete}
              />
            ))
          )}
        </LoadingError>
      </CardContent>
    </Card>
  </Fragment>
);

Entries.propTypes = {
  entries: PropTypes.object.isRequired,
  participants: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Entries;
