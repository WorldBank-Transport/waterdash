/* eslint-env jest */
describe('filtering functions', () => {
  let inRange, include, exclude;
  beforeEach(() => {
    const filters = require.requireActual('../filters');
    inRange = filters.inRange;
    include = filters.include;
    exclude = filters.exclude;
  });

  describe('inRange', () => {
    it('should allow values in the range', () => {
      expect(inRange([0, 2])(1)).toBe(true);
    });
    it('should reject values outside the range', () => {
      expect(inRange([1, 2])(0)).toBe(false);
      expect(inRange([0, 1])(2)).toBe(false);
    });
    it('should use inclusive bounds', () => {
      expect(inRange([1, 1])(1)).toBe(true);
      expect(inRange([1, 2])(1)).toBe(true);
      expect(inRange([1, 2])(2)).toBe(true);
    });
  });

  describe('include', () => {
    it('should be false for no values', () => {
      expect(include([])('a')).toBe(false);
    });
    it('should be false for other values', () => {
      expect(include(['a'])('z')).toBe(false);
      expect(include(['a', 'b'])('z')).toBe(false);
    });
    it('should be true for included values', () => {
      expect(include(['a'])('a')).toBe(true);
      expect(include(['a', 'b'])('a')).toBe(true);
      expect(include(['a', 'b'])('b')).toBe(true);
    });
  });

  describe('exclude', () => {
    it('should be true for no values', () => {
      expect(exclude([])('a')).toBe(true);
    });
    it('should be true for other values', () => {
      expect(exclude(['a'])('z')).toBe(true);
      expect(exclude(['a', 'b'])('z')).toBe(true);
    });
    it('should be false for excluded values', () => {
      expect(exclude(['a'])('a')).toBe(false);
      expect(exclude(['a', 'b'])('a')).toBe(false);
      expect(exclude(['a', 'b'])('b')).toBe(false);
    });
  });

});
