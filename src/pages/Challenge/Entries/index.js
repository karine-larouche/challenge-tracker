import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dateFormat, isToday } from '../../../utils/dateUtils';
import LoadingError from '../../../components/LoadingError';
import AddEntry from './AddEntry';
import DayEntries from './DayEntries';

const styles = theme => ({
  root: {
    width: 320,
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

const Entries = ({ entries, isLoading, hasError, onAdd, classes }) => (
  <div className={classes.root}>
    <AddEntry onSubmit={onAdd} />
    <Card>
      <CardContent>
        <LoadingError isLoading={isLoading} hasError={hasError}>
          {Object.keys(entries).length === 0 ? (
            <Typography color="textSecondary">No entries yet</Typography>
          ) : (
            Object.entries(entries).map(([day, dayEntries]) => (
              <Fragment key={day}>
                {isToday(day) || (
                  <div className={classes.date}>
                    <Divider className={classes.divider} />
                    <Typography color="textSecondary">
                      {dateFormat(day)}
                    </Typography>
                    <Divider className={classes.divider} />
                  </div>
                )}
                <DayEntries dayEntries={dayEntries} />
              </Fragment>
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
};

export default withStyles(styles)(Entries);
