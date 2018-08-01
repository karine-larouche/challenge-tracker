const toRgb = color => ({
  r: color.substring(1, 3),
  g: color.substring(3, 5),
  b: color.substring(5, 7),
});

const toDecNumber = hexString => Number(`0x${hexString}`);

export const mix = (a, b, percentageOfA) => {
  const rgbA = toRgb(a);
  const rgbB = toRgb(b);
  return ['r', 'g', 'b'].reduce(
    (acc, key) =>
      acc +
      Math.round(
        (toDecNumber(rgbA[key]) * percentageOfA +
          toDecNumber(rgbB[key]) * (100 - percentageOfA)) /
          100,
      ).toString(16),
    '#',
  );
};
