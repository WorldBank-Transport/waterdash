/* eslint-env jest */
describe('HTTP', () => {
  let http;
  beforeEach(() => {
    http = require.requireActual('../http');
  });

  describe('make http error nice', () => {
    pit('should pass-through non-Error errs', () =>
      http.makeHTTPErrorNice({a: 1})
        .then(() => expect('should not').toBe('get here'))  // fail the test
        .catch(err =>
          expect(err).toEqual({a: 1})));  // should not modify the err

    pit('should catch an Error and re-reject it as a nicer value', () =>
      http.makeHTTPErrorNice(new Error('blah'))
        .then(() => expect('should not').toBe('get here'))  // fail the test
        .catch(err => expect(err).toEqual(['error.api.http'])));
  });

  describe('reject not-ok http responses', () => {
    pit('should pass through an ok response', () =>
      http.rejectIfNotHTTPOk({ok: true})
        .then(r => expect(r).toEqual({ok: true}))
        .catch(() => expect('should not').toBe('get here')));

    pit('should reject a not-ok response', () =>
      http.rejectIfNotHTTPOk({ok: false})
        .then(() => expect('should not').toBe('get here'))
        .catch(err => expect(err).toEqual(['error.api.http.not-ok', undefined, undefined])));
  });

});
