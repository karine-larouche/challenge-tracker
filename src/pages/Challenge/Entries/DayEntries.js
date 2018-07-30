import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import BulletIcon from '@material-ui/icons/Done';
import { timeFormat } from '../../../utils/dateUtils';

const styles = theme => ({
  entry: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing.unit,
  },
  quantity: {
    marginBottom: -4,
  },
});

const DayEntries = ({ dayEntries, classes }) => (
  <Fragment>
    {dayEntries.map(entry => (
      <div key={entry.id} className={classes.entry}>
        <Avatar className={classes.avatar}>
          <BulletIcon />
        </Avatar>
        <div>
          <Typography className={classes.quantity} variant="body2">
            {entry.quantity}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {timeFormat(entry.time)}
          </Typography>
          <Typography color="textSecondary">{entry.note}</Typography>
        </div>
      </div>
    ))}
  </Fragment>
);

DayEntries.propTypes = {
  dayEntries: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      time: PropTypes.object.isRequired,
      note: PropTypes.string,
    }),
  ).isRequired,
};

export default withStyles(styles)(DayEntries);
