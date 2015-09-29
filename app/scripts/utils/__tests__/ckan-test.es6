/* eslint-env jest */
describe('CKAN', () => {
  jest.dontMock('results');
  jest.dontMock('lodash/lang/isUndefined');
  jest.dontMock('../functional');
  let ckan;
  beforeEach(() => {
    ckan = require.requireActual('../ckan');
  });

  describe('reject if not success', () => {
    pit('should pass-through success', () => {
      const ckanSuccessResp = {success: true, data: 'blah'};
      return ckan.rejectIfNotSuccess(ckanSuccessResp).then(v =>
        expect(v.data).toEqual('blah'));
    });
    pit('should reject if not success', () => {
      const ckanSuccessResp = {success: false};
      return ckan.rejectIfNotSuccess(ckanSuccessResp).catch(([v]) =>
        expect(v).toEqual('error.api.ckan'));
    });
  });

  describe('convert field', () => {
    it('should convert known types', () => {
      expect(ckan.convertField({id: 'a', type: 'int4'}).isOk()).toBe(true);
      expect(ckan.convertField({id: 'a', type: 'int4'}).unwrap().a('1')).toBe(1);

      expect(ckan.convertField({id: 'a', type: 'text'}).isOk()).toBe(true);
      expect(ckan.convertField({id: 'a', type: 'text'}).unwrap().a('z')).toEqual('z');

      expect(ckan.convertField({id: 'a', type: 'numeric'}).isOk()).toBe(true);
      expect(ckan.convertField({id: 'a', type: 'numeric'}).unwrap().a('4.4')).toEqual(4.4);
    });
    it('should err for unknown types', () => {
      expect(ckan.convertField().isOk()).toBe(false);
      expect(ckan.convertField({id: 'z', type: 'not a type'}).isErr()).toBe(true);
    });
  });

  describe('convert record', () => {
    it('should be empty and ok if records map is empty', () => {
      expect(ckan.convertRecord({}, {}).isOk()).toBe(true);
      expect(ckan.convertRecord({}, {z: 1}).isOk()).toBe(true);
    });
    it('should err if any record key is missing', () => {
      expect(ckan.convertRecord({z: v => v}, {}).isErr()).toBe(true);
    });
    it('should convert a record', () => {
      const converters = {
        a: v => v,
        b: v => v * 2,
      };
      expect(ckan.convertRecord(converters, {a: 1, b: 2}).unwrap()).toEqual({a: 1, b: 4});
    });
  });

  describe('convert ckan response', () => {
    it('should convert a response object', () => {
      const respObj = {
        success: true,
        result: {
          fields: [
            {id: 'a', type: 'text'},
            {id: 'b', type: 'numeric'},
          ],
          records: [
            {a: 'hello', b: '4.4'},
          ],
        },
      };
      expect(ckan.convertCkanResp(respObj).isOk()).toBe(true);
      expect(ckan.convertCkanResp(respObj).unwrap()).toEqual([{a: 'hello', b: 4.4}]);
    });
  });

});
