import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LoadingError from '../../../components/LoadingError';
import AddEntry from './AddEntry';
import DayEntries from './DayEntries';

const styles = () => ({
  root: {
    width: 320,
  },
});

const Entries = ({
  entries,
  isLoading,
  hasError,
  onAdd,
  onDelete,
  classes,
}) => (
  <div className={classes.root}>
    <AddEntry onSubmit={onAdd} />
    <Card>
      <CardContent>
        <LoadingError isLoading={isLoading} hasError={hasError}>
          {Object.keys(entries).length === 0 ? (
            <Typography color="textSecondary">No entries yet</Typography>
          ) : (
            Object.entries(entries).map(([day, dayEntries]) => (
              <DayEntries
                key={day}
                day={day}
                dayEntries={dayEntries}
                deleteEntry={onDelete}
              />
            ))
          )}
        </LoadingError>
      </CardContent>
    </Card>
  </div>
);

Entries.propTypes = {
  entries: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(Entries);
