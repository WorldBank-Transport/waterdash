/* eslint-env jest */
describe('Functional utilities', () => {
  jest.dontMock('results');
  let func;
  beforeEach(() => {
    func = require.requireActual('../functional');
  });

  describe('promise result', () => {
    pit('should resolve for Ok()', () => {
      const { Ok } = require.requireActual('results');
      return func.promiseResult(Ok('k')).then(v =>
        expect(v).toEqual('k'));
    });
    pit('should reject for Ok()', () => {
      const { Err } = require.requireActual('results');
      return func.promiseResult(Err('z')).catch(v =>
        expect(v).toEqual('z'));
    });
  });

  describe('Result.map', () => {
    it('should pass through an empty array', () => {
      const { Ok, Err } = require.requireActual('results');
      expect(func.Result.map(v => Ok(v), []).unwrap()).toEqual([]);
      expect(func.Result.map(v => Err(v), []).unwrap()).toEqual([]);
    });
    it('should map over all ok results', () => {
      const { Ok } = require.requireActual('results');
      expect(func.Result.map(v => Ok(v), [1]).unwrap()).toEqual([1]);
      expect(func.Result.map(v => Ok(v * 2), [1, 2]).unwrap()).toEqual([2, 4]);
    });
    it('should propagate an err', () => {
      const { Ok, Err } = require.requireActual('results');
      expect(func.Result.map(v => Err(v), [1]).unwrapErr()).toEqual(1);

      expect(func.Result.map(
        v => (v === 1 ? Ok(v) : Err(v)),
        [1, 2]
      ).unwrapErr()).toEqual(2);

      expect(func.Result.map(
        v => (v !== 1 ? Ok(v) : Err(v)),
        [1, 2]
      ).unwrapErr()).toEqual(1);
    });
  });

  describe('Result.mapObj', () => {
    it('should mapObj over all ok results', () => {
      const { Ok } = require.requireActual('results');
      const fn = ([k, v]) => {
        return Ok({[k]: v});
      };
      expect(func.Result.mapObj(fn, {a: 1}).unwrap()).toEqual({a: 1});
      const fn2 = ([k, v]) => {
        return Ok({[k]: v * 2});
      };
      expect(func.Result.mapObj(fn2, {a: 1, b: 2}).unwrap()).toEqual({a: 2, b: 4});
    });
  });

  describe('Result.merge', () => {
    it('should merge all ok results', () => {
      expect(func.Result.merge(
        [{a: 1}, {b: 2}, {c: 3}]
      ).unwrap()).toEqual({a: 1, b: 2, c: 3});
    });
  });

});
