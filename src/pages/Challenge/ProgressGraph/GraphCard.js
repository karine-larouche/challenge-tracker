import React from 'react';
import PropTypes from 'prop-types';
import { addDays, toDate } from 'date-fns';
import { ParentSize } from '@vx/responsive';
import { withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { dateFormat } from '../../../utils/dateUtils';
import ProgressGraph from './ProgressGraph';
import ToolTipContent from './ToolTipContent';

const GraphCard = ({
  startOfDisplayedMonth,
  monthEntries,
  className,
  theme,
}) => {
  const data = monthEntries.reduceRight(
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
        date: addDays(startOfDisplayedMonth, -1),
        grandTotal: 0,
      },
    ],
  );

  const getX = d => toDate(d.date);
  const getY = d => d.grandTotal;

  const getTooltipContent = d =>
    d.firstEntry ? null : (
      <ToolTipContent
        label={`${dateFormat(getX(d))}`}
        value={d.dayTotal}
        total={getY(d)}
      />
    );

  return (
    <Card className={className}>
      <ParentSize>
        {({ width, height }) => (
          <ProgressGraph
            width={width}
            height={height}
            data={data}
            getX={getX}
            getY={getY}
            getTooltipContent={getTooltipContent}
            theme={theme}
          />
        )}
      </ParentSize>
    </Card>
  );
};

GraphCard.propTypes = {
  startOfDisplayedMonth: PropTypes.object.isRequired,
  monthEntries: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
};

export default withTheme()(GraphCard);
