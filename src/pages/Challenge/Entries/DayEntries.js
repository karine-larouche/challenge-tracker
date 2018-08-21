import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { dateFormat, isToday } from '../../../utils/dateUtils';
import { propTypesEntry } from '../../../utils/propTypes';
import Entry from './Entry';

const styles = theme => ({
  date: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    flex: 1,
    margin: 10,
  },
});

const DayEntries = ({
  day,
  dayEntries,
  participants,
  deleteEntry,
  classes,
}) => (
  <Fragment>
    {isToday(day) || (
      <div className={classes.date}>
        <Divider className={classes.divider} />
        <Typography color="textSecondary">{dateFormat(day)}</Typography>
        <Divider className={classes.divider} />
      </div>
    )}
    <Fragment>
      {dayEntries.map(entry => (
        <Entry
          key={entry.id}
          entry={entry}
          participant={participants[entry.user]}
          onDelete={deleteEntry}
        />
      ))}
    </Fragment>
  </Fragment>
);

DayEntries.propTypes = {
  day: PropTypes.string.isRequired,
  dayEntries: PropTypes.arrayOf(propTypesEntry).isRequired,
  participants: PropTypes.object.isRequired,
  deleteEntry: PropTypes.func.isRequired,
};

export default withStyles(styles)(DayEntries);
