import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addDays,
  addWeeks,
  differenceInCalendarWeeks,
  lastDayOfWeek,
  startOfWeek,
  toDate,
} from 'date-fns';
import { ParentSize } from '@vx/responsive';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { dateFormat, dateFormatShort } from '../../../utils/dateUtils';
import { propTypesChallenge } from '../../../utils/propTypes';
import ProgressGraph from './ProgressGraph';
import ToolTipContent from './ToolTipContent';

const numberOfWeeks = challenge =>
  differenceInCalendarWeeks(
    challenge.endDate || new Date(),
    challenge.startDate,
  ) + 1;

const getDataByDay = (entries, challenge) => {
  const data = Object.entries(entries).reduceRight(
    (acc, [day, { total }]) => {
      acc.push({
        date: new Date(day),
        dayTotal: total,
        grandTotal: acc[acc.length - 1].grandTotal + total,
      });
      return acc;
    },
    [
      {
        firstEntry: true,
        date: addDays(challenge.startDate, -1),
        grandTotal: 0,
      },
    ],
  );

  const getX = d => toDate(d.date);
  const getY = d => d.grandTotal;

  const getToolTipContent = d =>
    d.firstEntry ? null : (
      <ToolTipContent
        label={`${dateFormat(getX(d))}`}
        value={d.dayTotal}
        total={getY(d)}
      />
    );

  return [data, getX, getY, getToolTipContent];
};

const getDataByWeek = (entries, challenge) => {
  const data = Array.from(
    new Array(numberOfWeeks(challenge) + 1),
    (value, index) => ({
      week: index,
      firstDay: startOfWeek(addWeeks(challenge.startDate, index - 1)),
      lastDay: lastDayOfWeek(addWeeks(challenge.startDate, index - 1)),
      weekTotal: 0,
      grandTotal: 0,
    }),
  );
  Object.entries(entries).forEach(([day, { total }]) => {
    const entryDay = new Date(day);
    const week = differenceInCalendarWeeks(entryDay, challenge.startDate) + 1;
    data[week].weekTotal += total;
  });
  data.slice(1).forEach(({ week, weekTotal }) => {
    data[week].grandTotal = data[week - 1].grandTotal + weekTotal;
  });

  const getX = d => d.week;
  const getY = d => d.grandTotal;

  const getToolTipContent = d =>
    getX(d) === 0 ? null : (
      <ToolTipContent
        label={`${dateFormatShort(d.firstDay)} - ${dateFormatShort(d.lastDay)}`}
        value={d.weekTotal}
        total={d.grandTotal}
      />
    );

  return [data, getX, getY, getToolTipContent];
};

const styles = theme => ({
  progressGraph: {
    [theme.breakpoints.up('sm')]: { height: 400 },
    [theme.breakpoints.down('xs')]: { height: '100%' },
  },
});

const GraphCard = ({ entries, currentChallenge, classes, theme }) => {
  if (!currentChallenge || Object.keys(entries).length === 0) {
    return null;
  }

  const [data, getX, getY, getToolTipContent] =
    numberOfWeeks(currentChallenge) > 10
      ? getDataByWeek(entries, currentChallenge)
      : getDataByDay(entries, currentChallenge);

  return (
    <Card className={classes.progressGraph}>
      <ParentSize>
        {({ width, height }) => (
          <ProgressGraph
            width={width}
            height={height}
            data={data}
            getX={getX}
            getY={getY}
            getToolTipContent={getToolTipContent}
            theme={theme}
          />
        )}
      </ParentSize>
    </Card>
  );
};

GraphCard.propTypes = {
  entries: PropTypes.object.isRequired,
  currentChallenge: propTypesChallenge,
};

GraphCard.defaultProps = {
  currentChallenge: undefined,
};

const mapState = state => ({
  entries: state.entries.entries,
  currentChallenge: state.challenges.currentChallenge,
});

export default withStyles(styles, { withTheme: true })(
  connect(mapState)(GraphCard),
);
