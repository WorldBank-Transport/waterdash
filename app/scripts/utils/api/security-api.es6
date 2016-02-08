import { fetchAndCheck, postAndCheck } from './http';
import { toQuery } from './querystring';

/**
 * @param {object} obj The object returned by our API
 * @returns {Promise<object>} resolves the object, or rejects if it's an error
 */
export function rejectIfNotSuccess(obj) {
  if (obj.code !== 200) {
    return Promise.reject([obj.code, obj.message]);
  } else {  // pass-through
    return Promise.resolve(obj);
  }
}

/**
 * @param {string} root The SECURITY API root
 * @param {string} path Any path to be applied
 * @param {object} body Any object to be applied
 * @returns {Promise<object>} The converted data
 */
export function post(root, path, body) {
  return postAndCheck(root + path, body)
    .then(resp => resp.json())
    .then(rejectIfNotSuccess);
}

/**
 * @param {string} root The SECURITY API root
 * @param {string} path Any path to be applied
 * @param {object} query Any object to be applied
 * @returns {Promise<object>} The converted data
 */
export function get(root, path, query) {
  let queryString = '';
  toQuery(query)
    .andThen(querys => queryString = querys);
  return fetchAndCheck(`${root}${path}?${queryString}`)
    .then(resp => resp.json())
    .then(rejectIfNotSuccess);
}

const securityApi = {
  get,
  post,
};

export default securityApi;
