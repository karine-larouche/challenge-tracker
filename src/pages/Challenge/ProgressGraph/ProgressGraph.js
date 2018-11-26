import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { GridRows, GridColumns } from '@vx/grid';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveMonotoneX } from '@vx/curve';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { extent, max } from 'd3-array';
import Dot from './Dot';

const ProgressGraph = ({
  width,
  height,
  data,
  getX,
  getY,
  getToolTipContent,
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
    domain: extent(data, getX),
  });
  const yScale = scaleLinear({
    range: [height, 0],
    domain: [0, max(data, getY) * 1.1],
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
          x={getX}
          y={getY}
          stroke={line}
          strokeWidth={3}
          curve={curveMonotoneX}
          glyph={(d, i) => (
            <g key={`line-point-${i}`}>
              <Dot
                cx={xScale(getX(d))}
                cy={yScale(getY(d))}
                border={dotBorder}
                fill={dotFill}
                background={background}
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
      </svg>
      {tooltipOpen && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          {getToolTipContent(tooltipData)}
        </TooltipWithBounds>
      )}
    </Fragment>
  );
};

ProgressGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  getX: PropTypes.func.isRequired,
  getY: PropTypes.func.isRequired,
  getToolTipContent: PropTypes.func.isRequired,
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
