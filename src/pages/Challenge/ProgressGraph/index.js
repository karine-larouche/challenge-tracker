import React from 'react';
import PropTypes from 'prop-types';
import { ParentSize } from '@vx/responsive';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ProgressGraph from './ProgressGraph';

const styles = () => ({
  progressGraph: { height: 400 },
});

const GraphCard = ({ entries, classes, theme }) => {
  const data = Object.entries(entries).reduceRight((acc, [day, { total }]) => {
    acc.push({
      date: day,
      value: (acc.length > 0 ? acc[acc.length - 1].value : 0) + total,
    });
    return acc;
  }, []);

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
};

export default withStyles(styles, { withTheme: true })(GraphCard);
