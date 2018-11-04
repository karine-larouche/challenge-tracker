import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ParentSize } from '@vx/responsive';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ProgressGraph from './ProgressGraph';

const styles = theme => ({
  progressGraph: {
    [theme.breakpoints.up('sm')]: { height: 400 },
    [theme.breakpoints.down('xs')]: { height: '100%' },
  },
});

const GraphCard = ({ entries, classes, theme }) => {
  const data = Object.entries(entries).reduceRight((acc, [day, { total }]) => {
    acc.push({
      date: new Date(day),
      value: (acc.length > 0 ? acc[acc.length - 1].value : 0) + total,
    });
    return acc;
  }, []);

  return Object.keys(entries).length === 0 ? null : (
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
};

const mapState = state => ({
  entries: state.entries.entries,
});

export default withStyles(styles, { withTheme: true })(
  connect(mapState)(GraphCard),
);
