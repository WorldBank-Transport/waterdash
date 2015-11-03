/* eslint-env jest */
describe('querystring util', () => {
  jest.dontMock('results');
  jest.dontMock('../../functional');
  let querystring;
  beforeEach(() => {
    querystring = require.requireActual('../querystring');
  });

  describe('queryval', () => {
    it('should stringify `undefined` with a warning', () => {
      const mockedWarn = require('../../warn');  // jest auto-mocks requires
      expect(querystring.queryVal().isOk()).toBe(true);
      expect(querystring.queryVal().unwrap()).toEqual('undefined');
      expect(mockedWarn).toBeCalled();
    });
    it('should pass through strings', () => {
      expect(querystring.queryVal('').isOk()).toBe(true);
      expect(querystring.queryVal('').unwrap()).toEqual('');
      expect(querystring.queryVal('z').unwrap()).toEqual('z');
    });
    it('should err for strings with commas', () => {
      expect(querystring.queryVal(',').isErr()).toBe(true);
    });
    it('should stringify numbers', () => {
      expect(querystring.queryVal(4).isOk()).toBe(true);
      expect(querystring.queryVal(4).unwrap()).toEqual('4');
    });
    it('should comma-join an array', () => {
      expect(querystring.queryVal([1, 'z']).isOk()).toBe(true);
      expect(querystring.queryVal([1, 'z']).unwrap()).toEqual('1,z');
    });
    it('should give an empty string for an emty array', () => {
      expect(querystring.queryVal([]).isOk()).toBe(true);
      expect(querystring.queryVal([]).unwrap()).toEqual('');
    });
    it('should err for a recursive array', () => {
      expect(querystring.queryVal([['z']]).isErr()).toBe(true);
      expect(querystring.queryVal([[]]).isErr()).toBe(true);
    });
  });


  describe('toQuery', () => {
    it('should throw for missing arg', () => {
      expect(() => querystring.toQuery()).toThrow();
    });
    it('should give an empty string for an empty object', () => {
      expect(querystring.toQuery({}).isOk()).toBe(true);
      expect(querystring.toQuery({}).unwrap()).toBe('');
    });
    it('should make a querystring', () => {
      expect(querystring.toQuery({a: 1, b: 'z'}).isOk()).toBe(true);
      expect(querystring.toQuery({a: 1, b: 'z'}).unwrap()).toBe('a=1&b=z');
    });
    it('should propagate an err from queryVal', () => {
      const badInput = 'commas,not,allowed';
      const err = querystring.queryVal(badInput).unwrapErr();
      expect(querystring.toQuery({a: badInput}).isErr()).toEqual(true);
      expect(querystring.toQuery({a: badInput}).unwrapErr()).toEqual(err);
    });
  });

});
