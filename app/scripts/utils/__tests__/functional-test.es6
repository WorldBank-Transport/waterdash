/* eslint-env jest */
describe('Functional utilities', () => {
  jest.dontMock('results');
  jest.dontMock('lodash/lang/isUndefined');
  jest.dontMock('lodash/lang/isObject');
  jest.dontMock('lodash/object/has');
  jest.dontMock('lodash/internal/baseGet'),
  jest.dontMock('lodash/internal/baseSlice'),
  jest.dontMock('lodash/lang/isArguments'),
  jest.dontMock('lodash/lang/isArray'),
  jest.dontMock('lodash/internal/isIndex'),
  jest.dontMock('lodash/internal/isKey'),
  jest.dontMock('lodash/internal/isLength'),
  jest.dontMock('lodash/array/last'),
  jest.dontMock('lodash/internal/toPath');
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

  describe('Result.mapMergeObj', () => {
    it('should pass through an empty object', () => {
      expect(func.Result.mapMergeObj(null, {}).unwrap()).toEqual({});
    });
    it('should mapMergeObj over all ok results', () => {
      const { Ok } = require.requireActual('results');
      const fn = ([k, v]) => {
        return Ok({[k]: v});
      };
      expect(func.Result.mapMergeObj(fn, {a: 1}).unwrap()).toEqual({a: 1});
      const fn2 = ([k, v]) => {
        return Ok({[k]: v * 2});
      };
      expect(func.Result.mapMergeObj(fn2, {a: 1, b: 2}).unwrap()).toEqual({a: 2, b: 4});
    });
  });

  describe('Result.mapObj', () => {
    it('should pass through an empty object', () => {
      expect(func.Result.mapObj(null, {}).unwrap()).toEqual([]);
    });
    it('should mapObj over all ok results', () => {
      const { Ok } = require.requireActual('results');
      const fn = ([k, v]) => {
        return Ok(`${k}${v}`);
      };
      expect(func.Result.mapObj(fn, {a: 1}).unwrap()).toEqual(['a1']);
      const fn2 = ([k, v]) => {
        return Ok(`${k}${v * 2}`);
      };
      expect(func.Result.mapObj(fn2, {a: 1, b: 2}).unwrap()).toEqual(['a2', 'b4']);
    });
  });

  describe('Result.merge', () => {
    it('should merge all ok results', () => {
      expect(func.Result.merge(
        [{a: 1}, {b: 2}, {c: 3}]
      ).unwrap()).toEqual({a: 1, b: 2, c: 3});
    });
  });

  describe('groupBy', () => {
    it('should groupBy b', () => {
      expect(func.Result.groupBy([{a: 1, b: 'b'}, {a: 2, b: 'b'}, {a: 1, b: 'a'}], 'b'))
        .toEqual({b: [{a: 1, b: 'b'}, {a: 2, b: 'b'}], a: [{a: 1, b: 'a'}]});
    });
    it('hould only groupBy c, ignore the rest', () => {
      expect(func.Result.groupBy([{a: 1, b: 'b'}, {a: 2, b: 'b'}, {a: 1, b: 'a'}, {a: 2, c: 'c'}], 'c'))
        .toEqual({c: [{a: 2, c: 'c'}]});
    });
    it('fail: should not groupBy c, missing prop', () => {
      expect(func.Result.groupBy([{a: 1, b: 'b'}, {a: 2, b: 'b'}, {a: 1, b: 'a'}], 'c'))
        .toEqual({});
    });
  });
  describe('countBy', () => {
    it('it shall countBy b', () => {
      expect(func.Result.countBy([{a: 1, b: 'm'}, {a: 2, b: 'm'}, {a: 1, b: 'n'}], 'b'))
        .toEqual({m: 2, n: 1, total: 3});
    });
    it('it shall only countBy c, ignore the rest', () => {
      expect(func.Result.countBy([{a: 1, b: 'm'}, {a: 2, b: 'm'}, {a: 1, b: 'n'}, {a: 3, c: 'm'}], 'c'))
        .toEqual({m: 1, total: 1});
    });
    it('fail: should not countBy c, missing prop', () => {
      expect(func.Result.countBy([{a: 1, b: 'b'}, {a: 2, b: 'b'}, {a: 1, b: 'a'}], 'c'))
        .toEqual({});
    });
  });
  describe('countByGroupBy', () => {
    it('it shall countBy b and GroupBy a', () => {
      expect(func.Result.countByGroupBy([{a: 1, b: 'm'}, {a: 2, b: 'm'}, {a: 1, b: 'n'}, {a: 1, b: 'm'}], 'a', 'b'))
        .toEqual({1: {m: 2, n: 1, total: 3}, 2: {m: 1, total: 1}});
    });
    it('fail: should not countByGroupBy c, missing group prop', () => {
      expect(func.Result.countByGroupBy([{a: 1, b: 'b'}, {a: 2, b: 'b'}, {a: 1, b: 'a'}], 'c', 'b'))
        .toEqual({});
    });
    it('fail: should not countByGroupBy c, missing count prop', () => {
      expect(func.Result.countByGroupBy([{a: 1, b: 'b'}, {a: 2, b: 'b'}, {a: 1, b: 'a'}], 'a', 'c'))
        .toEqual({});
    });
  });

});
