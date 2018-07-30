import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dateFormat, isToday } from '../../../utils/dateUtils';
import DayEntries from './DayEntries';

const styles = theme => ({
  root: {
    maxWidth: 300,
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

const Entries = ({ entries, classes }) => (
  <div className={classes.root}>
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
  </div>
);

Entries.propTypes = {
  entries: PropTypes.object.isRequired,
};

export default withStyles(styles)(Entries);
