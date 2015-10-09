/* eslint camelcase: 0 */  // snake_case query params are not set by us
import throttle from 'lodash/function/throttle';
import * as func from './functional';
import { Ok, Err } from 'results';
import isUndefined from 'lodash/lang/isUndefined';
import warn from './warn';
import { toQuery } from './querystring';


const converters = {
  text: t => t,
  numeric: n => parseFloat(n),
  int4: n => parseInt(n, 10),
};


/**
 * @param {object} err The HTTP error
 * @returns {Promise<object>} re-rejects the err with the error code key
 */
export function makeHTTPErrorNice(err) {
  return new Promise((resolve, reject) => {
    warn(err);
    reject(['error.api.http']);
  });
}


/**
 * @param {object} response The raw fetch response
 * @returns {Promise<object>} resolves to the raw response again or rejects
 */
export function rejectIfNotHTTPOk(response) {
  return new Promise((resolve, reject) => {
    if (!(response.status >= 200 && response.status < 300)) {
      warn(response);
      reject(['error.api.http.not-ok', response.status, response.statusText]);
    } else {
      resolve(response);
    }
  });
}

/**
 * @param {object} ckanObj The object returned by CKAN
 * @returns {Promise<object>} resolves the object, or rejects if it's an error
 */
export function rejectIfNotSuccess(ckanObj) {
  return new Promise((resolve, reject) => {
    if (!ckanObj.success) {
      warn(ckanObj);
      reject(['error.api.ckan']);
    } else {
      resolve(ckanObj);
    }
  });
}

/**
 * @param {string} id The field name
 * @param {string} type The field type, must match something in converters
 * @returns {Result} an (id, converter) pair for converting a record key to its type
 */
export function convertField({id, type} = {}) {
  if (!isUndefined(converters[type])) {
    return Ok({[id]: converters[type]});
  } else {
    warn(`Unknown data type for conversion: '${type}', specified for field ${id}`);
    return Err(['error.api.ckan.unknown-field-type', type, id]);
  }
}

/**
 * @param {object} fieldConverters A key:func mapping of field names to converter functions
 * @param {object} record The key:rawValue record to be converted
 * @returns {Result} the record but with converted values
 */
export function convertRecord(fieldConverters, record) {
  /*
  Original, slow version:

    function convertRecord(fieldConverters, record) {
      return func.Result.mapMergeObj(([id, converter]) => {
        if (!isUndefined(record[id])) {
          return Ok({[id]: converter(record[id])});
        } else {
          warn(`Record is missing field '${id}': ${JSON.stringify(record)}`);
          return Err(['error.api.ckan.record-missing-field', id]);
        }
      }, fieldConverters);
    }

  The above function ate over 2s of CPU time for waterpoints on my machine, so
  here is a faster implementation:
  */
  const converted = {};
  for (const k in fieldConverters) {
    if (fieldConverters.hasOwnProperty(k)) {
      if (typeof record[k] !== 'undefined') {
        converted[k] = fieldConverters[k](record[k]);
      } else {
        warn(`Record is missing field '${k}': ${JSON.stringify(record)}`);
        return Err(['error.api.ckan.record-missing-field', k]);
      }
    }
  }
  return Ok(converted);
}

/**
 * @param {object} result The CKAN raw result
 * @param {object} result.result The actual CKAN data
 * @param {array} result.result.fields The data type descriptions
 * @param {array} result.result.records The raw data records as strings
 * @returns {Result<array>} The converted data
 */
export function convertCkanResp(result) {
  const {result: {fields, records}} = result;
  return func.Result
    .map(convertField, fields)
    .andThen(func.Result.merge)
    .andThen(fieldConverters =>
      func.Result.map(rec => convertRecord(fieldConverters, rec), records));
}

const resourceUrl = (root, id, params = {}) => func.promiseResult(
  toQuery({...params, resource_id: id})
    .orElse(err => {
      warn(err);
      return Err(['error.api.pre-request']);
    })
    .andThen(qs => Ok(`${root}/action/datastore_search?${qs}`)));

const getOffsets = (chunkSize, total) => {
  const offsets = [];
  const num = Math.ceil(total / chunkSize);
  for (let i = 1; i < num; i++) {  // skip the first chunk (we already have it)
    offsets.push(i * chunkSize);
  }
  return offsets;
};

const convertChunk = data => func.promiseResult(convertCkanResp(data));

const promiseConcat = (notify, ...promises) => new Promise((resolve, reject) => {
  let combined = Ok([]);
  promises.forEach(prom => prom
    .then(newData => {
      if (combined.isOk()) {
        combined = Ok(combined.unwrap().concat(newData));
        notify(combined.unwrap());
      }
    })
    .catch(err => {
      combined = Err(err);
    }));
  Promise.all(promises)
    .then(() => resolve(combined.unwrap()))
    .catch(reject);
});

/**
 * @param {string} root The CKAN API root
 * @param {string} id The resource's id
 * @param {object} query Any query to be applied
 * @param {func} notify A callback to indicate progress
 * @returns {Promise<array<object>>} The converted data
 */
function get(root, id, query = {}, notify = () => null) {
  const chunk = 6000;
  const throttledNotify = throttle(notify, 1000, {leading: true, trailing: false});

  const getChunk = (offset) => {
    return resourceUrl(root, id, {...query, limit: chunk, offset: offset})
      .then(fetch)
      .catch(makeHTTPErrorNice)
      .then(rejectIfNotHTTPOk)
      .then(resp => resp.json())
      .then(rejectIfNotSuccess);
  };

  const getTheRest = (firstResp) => {
    const { total } = firstResp.result;
    const first = convertChunk(firstResp);
    if (total <= chunk) {
      return first;  // we have it all
    } else {
      const chunkPromises = getOffsets(chunk, total)
        .map(offset => getChunk(offset).then(convertChunk));
      return promiseConcat(throttledNotify, first, ...chunkPromises);
    }
  };

  return getChunk(0)
    .then(getTheRest);
}


export default { get };
