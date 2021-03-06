import warn from '../warn';
require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * @param {object} err The HTTP error
 * @returns {Promise<object>} re-rejects the err with the error code key
 */
export function makeHTTPErrorNice(err) {
  if (err instanceof Error) {  // this probably came from fetch()
    warn(err);
    return Promise.reject(['error.api.http']);
  } else {  // probably not an http error, so just pass it on
    return Promise.reject(err);
  }
}


/**
 * @param {object} response The raw fetch response
 * @returns {Promise<object>} resolves to the raw response again or rejects
 */
export function rejectIfNotHTTPOk(response) {
  if (!response.ok) {
    warn(response);
    return Promise.reject(['error.api.http.not-ok', response.status, response.statusText]);
  } else {  // pass-through
    return Promise.resolve(response);
  }
}


/**
 * @param {string} url The url to fetch
 * @returns {Promise} The fetch response object
 */
export function fetchAndCheck(url) {
  return fetch(url)
    .catch(makeHTTPErrorNice)
    .then(rejectIfNotHTTPOk);
}

/**
 * @param {string} url The url to post
 * @param {object} body The request body to post
 * @returns {Promise} The fetch response object
 */
export function postAndCheck(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).catch(makeHTTPErrorNice)
    .then(rejectIfNotHTTPOk);
}
