import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { GridRows, GridColumns } from '@vx/grid';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveMonotoneX } from '@vx/curve';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { extent, max } from 'd3-array';
import toDate from 'date-fns/toDate';
import Typography from '@material-ui/core/Typography';
import { dateFormat } from '../../../utils/dateUtils';
import Dot from './Dot';

const x = d => toDate(d.date);
const y = d => d.value;

const ProgressGraph = ({
  width,
  height,
  data,
  tooltipOpen,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop,
  tooltipLeft,
  theme,
}) => {
  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [height, 0],
    domain: [0, max(data, y) * 1.1],
    nice: true,
  });

  const gridStyle = {
    lineStyle: { pointerEvents: 'none' },
    strokeDasharray: '2,2',
    stroke: 'rgba(255,255,255,0.3)',
  };

  const background = theme.palette.primary.main;
  const line = theme.palette.secondary.main;
  const dotBorder = theme.palette.common.white;
  const dotFill = line;

  return (
    <Fragment>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} />
        <GridRows scale={yScale} width={width} {...gridStyle} />
        <GridColumns scale={xScale} height={height} {...gridStyle} />
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={line}
          strokeWidth={3}
          curve={curveMonotoneX}
          glyph={(d, i) => (
            <g key={`line-point-${i}`}>
              <Dot
                cx={xScale(x(d))}
                cy={yScale(y(d))}
                border={dotBorder}
                fill={dotFill}
                background={background}
                onMouseEnter={() => () => {
                  showTooltip({
                    tooltipLeft: xScale(x(d)),
                    tooltipTop: yScale(y(d)) + 20,
                    tooltipData: d,
                  });
                }}
                onMouseLeave={() => () => hideTooltip()}
              />
            </g>
          )}
        />
      </svg>
      {tooltipOpen && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          <Typography>{`${dateFormat(x(tooltipData))}`}</Typography>
          <Typography variant="subtitle2" color="primary">{`${y(
            tooltipData,
          )}`}</Typography>
        </TooltipWithBounds>
      )}
    </Fragment>
  );
};

ProgressGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  tooltipOpen: PropTypes.bool.isRequired, // withTooltip
  showTooltip: PropTypes.func.isRequired, // withTooltip
  hideTooltip: PropTypes.func.isRequired, // withTooltip
  tooltipData: PropTypes.object, // withTooltip
  tooltipTop: PropTypes.number, // withTooltip
  tooltipLeft: PropTypes.number, // withTooltip
};

ProgressGraph.defaultProps = {
  tooltipData: undefined,
  tooltipTop: undefined,
  tooltipLeft: undefined,
};

export default withTooltip(ProgressGraph);
