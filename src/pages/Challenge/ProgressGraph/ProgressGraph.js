import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { GridRows, GridColumns } from '@vx/grid';
import { LinePath } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { curveMonotoneX } from '@vx/curve';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { max } from 'd3-array';
import Dot from './Dot';

const ProgressGraph = ({
  width,
  height,
  data,
  getX,
  getY,
  getTooltipContent,
  tooltipOpen,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop,
  tooltipLeft,
  theme,
}) => {
  const xScale = scaleLinear({
    range: [0, width],
    domain: [0, 31],
  });
  const yScale = scaleLinear({
    range: [height, 0],
    domain: [0, max(data, monthData => max(monthData, getY)) * 1.1],
    nice: true,
  });

  const gridStyle = {
    lineStyle: { pointerEvents: 'none' },
    strokeDasharray: '2,2',
    stroke: 'rgba(255,255,255,0.3)',
  };

  const backgroundColor = theme.palette.primary.main;
  const lineColor = theme.palette.secondary.main;
  const dotBorderColor = theme.palette.common.white;
  const dotFillColor = lineColor;

  return (
    <Fragment>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={backgroundColor}
        />
        <GridRows scale={yScale} width={width} {...gridStyle} />
        <GridColumns scale={xScale} height={height} {...gridStyle} />
        {data
          .map((monthData, i) => (
            <LinePath
              key={monthData[1] ? monthData[1].date.getMonth() : `empty-${i}`}
              data={monthData}
              xScale={xScale}
              yScale={yScale}
              x={getX}
              y={getY}
              stroke={lineColor}
              opacity={1 - i * 0.4}
              strokeWidth={3}
              curve={curveMonotoneX}
              glyph={(d, j) => (
                <g key={`line-point-${j}`}>
                  <Dot
                    cx={xScale(getX(d))}
                    cy={yScale(getY(d))}
                    border={dotBorderColor}
                    fill={dotFillColor}
                    opacity={1 - i * 0.4}
                    background={backgroundColor}
                    onMouseEnter={() => () => {
                      showTooltip({
                        tooltipLeft: xScale(getX(d)),
                        tooltipTop: yScale(getY(d)) + 20,
                        tooltipData: d,
                      });
                    }}
                    onMouseLeave={() => () => hideTooltip()}
                  />
                </g>
              )}
            />
          ))
          .reverse()}
      </svg>
      {tooltipOpen &&
        getTooltipContent(tooltipData) && (
          <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
            {getTooltipContent(tooltipData)}
          </TooltipWithBounds>
        )}
    </Fragment>
  );
};

ProgressGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  getX: PropTypes.func.isRequired,
  getY: PropTypes.func.isRequired,
  getTooltipContent: PropTypes.func.isRequired,
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
