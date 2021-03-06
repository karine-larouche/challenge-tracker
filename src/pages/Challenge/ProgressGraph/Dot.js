import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { GlyphCircle } from '@vx/glyph';
import { mix } from 'colour-utils';

const area = ray => ray * ray * 3.16;

const Dot = ({
  cx,
  cy,
  border,
  fill,
  opacity,
  background,
  onMouseEnter,
  onMouseLeave,
}) => (
  <Fragment>
    <GlyphCircle
      className="dot"
      fill={background}
      left={cx}
      top={cy}
      size={area(9)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
    <GlyphCircle
      className="dot"
      fill={border}
      opacity={opacity}
      left={cx}
      top={cy}
      size={area(6)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
    <GlyphCircle
      className="dot"
      fill={mix(background, fill, opacity)}
      left={cx}
      top={cy}
      size={area(3)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  </Fragment>
);

Dot.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  border: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default Dot;
