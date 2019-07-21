import { mix } from '../colorUtils';

describe('mix', () => {
  it('mixes colors according to the provided percentage', () => {
    expect(mix('#FFFFFF', '#000000', 25)).toBe('#404040');

    expect(mix('#FFFFFF', '#000000', 0)).toBe('#000000');
    expect(mix('#FFFFFF', '#000000', 100)).toBe('#ffffff');

    expect(mix('#000000', '#000000', 75)).toBe('#000000');
    expect(mix('#000000', '#000000', 0)).toBe('#000000');
    expect(mix('#000000', '#000000', 100)).toBe('#000000');

    expect(mix('#01a600', '#E0B32F', 25)).toBe('#a8b023');
  });
});
