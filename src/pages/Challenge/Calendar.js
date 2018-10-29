import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CalendarHeatmap from 'react-calendar-heatmap';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { addDays, differenceInCalendarWeeks } from 'date-fns';
import { now, isAfterToday, dateFormat } from '../../utils/dateUtils';
import { propTypesChallenge } from '../../utils/propTypes';
import LoadingError from '../../components/LoadingError';

const styles = theme => ({
  content: { '&:last-child': { paddingBottom: 0 } },
  '@global': {
    '.react-calendar-heatmap text': {
      fontSize: 10,
      fill: theme.palette.text.disabled,
    },
    '.react-calendar-heatmap .react-calendar-heatmap-small-text': {
      fontSize: 5,
    },
    '.react-calendar-heatmap .color-empty': {
      fill: theme.palette.background.default,
    },
    '.react-calendar-heatmap .color-scale-1': {
      fill: theme.palette.primary.veryLight,
    },
    '.react-calendar-heatmap .color-scale-2': {
      fill: theme.palette.primary.light,
    },
    '.react-calendar-heatmap .color-scale-3': {
      fill: theme.palette.primary.main,
    },
    '.react-calendar-heatmap .color-scale-4': {
      fill: theme.palette.primary.dark,
    },
  },
});

const getDisplayedDates = challenge => ({
  start: addDays(challenge && challenge.startDate, -1),
  end: (challenge && challenge.endDate) || now(),
});

const calculateWidth = dates =>
  differenceInCalendarWeeks(dates.end, dates.start) * 20 + 128;

const getMaxCount = values => Math.max(...values.map(v => v.count));

const classForValue = maxCount => value =>
  value
    ? `color-scale-${Math.ceil((value.count * 4) / maxCount)}`
    : 'color-empty';

const Calendar = ({ entries, challenge, isLoading, hasError, classes }) => {
  const dates = getDisplayedDates(challenge);
  const values = Object.entries(entries).map(([day, value]) => ({
    date: new Date(day),
    count: value.total,
  }));
  return (
    <LoadingError isLoading={isLoading} hasError={hasError}>
      {!challenge || isAfterToday(challenge.startDate) ? (
        <Fragment />
      ) : (
        <Card>
          <CardContent
            style={{ maxWidth: calculateWidth(dates) }}
            className={classes.content}
          >
            <CalendarHeatmap
              startDate={dates.start}
              endDate={dates.end}
              values={values}
              showWeekdayLabels
              titleForValue={value =>
                value ? `${dateFormat(value.date)}:\n${value.count}` : ''
              }
              classForValue={classForValue(getMaxCount(values))}
            />
          </CardContent>
        </Card>
      )}
    </LoadingError>
  );
};

Calendar.propTypes = {
  challenge: propTypesChallenge,
  entries: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};

Calendar.defaultProps = {
  challenge: undefined,
};

export default withStyles(styles)(Calendar);
