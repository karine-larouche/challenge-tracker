import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDays } from 'date-fns';
import { ParentSize } from '@vx/responsive';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { propTypesChallenge } from '../../../utils/propTypes';
import ProgressGraph from './ProgressGraph';

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

  const data = Object.entries(entries).reduceRight(
    (acc, [day, { total }]) => {
      acc.push({
        date: new Date(day),
        value: acc[acc.length - 1].value + total,
      });
      return acc;
    },
    [{ date: addDays(currentChallenge.startDate, -1), value: 0 }],
  );

  return (
    <Card className={classes.progressGraph}>
      <ParentSize>
        {({ width, height }) => (
          <ProgressGraph
            width={width}
            height={height}
            data={data}
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
