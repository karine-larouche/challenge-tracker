import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dateFormat, isToday } from '../../../utils/dateUtils';
import LoadingError from '../../../components/LoadingError';
import DayEntries from './DayEntries';

const styles = theme => ({
  root: {
    width: 300,
  },
  date: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    flex: 1,
    margin: 10,
  },
});

const Entries = ({ entries, isLoading, hasError, classes }) => (
  <div className={classes.root}>
    <LoadingError isLoading={isLoading} hasError={hasError}>
      {Object.entries(entries).map(([day, dayEntries]) => (
        <Fragment key={day}>
          {isToday(day) || (
            <div className={classes.date}>
              <Divider className={classes.divider} />
              <Typography color="textSecondary">{dateFormat(day)}</Typography>
              <Divider className={classes.divider} />
            </div>
          )}
          <DayEntries dayEntries={dayEntries} />
        </Fragment>
      ))}
    </LoadingError>
  </div>
);

Entries.propTypes = {
  entries: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Entries);
