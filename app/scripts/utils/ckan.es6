import * as func from './functional';
import { Ok, Err, Some, None } from 'results';
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
 * @returns {object} the record but with converted values
 */
export function convertRecord(fieldConverters, record) {
  return func.Result.mapMergeObj(([id, converter]) => {
    if (!isUndefined(record[id])) {
      return Ok({[id]: converter(record[id])});
    } else {
      warn(`Record is missing field '${id}': ${JSON.stringify(record)}`);
      return Err(['error.api.ckan.record-missing-field', id]);
    }
  }, fieldConverters);
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

const API_ROOT = '//data.takwimu.org/api';
const resourceUrl = (id, params = {}) => func.promiseResult(
  toQuery({...params, resource_id: id})
    .orElse(err => {
      warn(err);
      return Err(['error.api.pre-request']);
    })
    .andThen(qs => Ok(`${API_ROOT}/action/datastore_search?${qs}`)));

const peek = id => payload => new Promise(resolve => {
  console.log(id, payload);
  resolve(payload);
});

const peer = id => err => new Promise((resolve, reject) => {
  console.error(id, err);
  reject(err);
});

/**
 * @param {string} id The resource's id
 * @param {object} query Any query to be applied
 * @param {func} notify A callback to indicate progress
 * @returns {Promise<array<object>>} The converted data
 */
function get(id, query = {}, notify = () => null) {
  const chunk = 6000;

  const getOffsets = (chunk, total) => {
    const offsets = [];
    const num = Math.ceil(total / chunk);
    for (let i = 1; i < num; i++) {  // skip the first chunk (we already have it)
      offsets.push(i * chunk);
    }
    return offsets;
  };

  const getChunk = (offset) => {
    return resourceUrl(id, {...query, limit: chunk, offset: offset})
      .then(fetch)
      .catch(makeHTTPErrorNice)
      .then(rejectIfNotHTTPOk)
      .then(resp => resp.json())
      .then(rejectIfNotSuccess)
      .then(data => func.promiseResult(convertCkanResp(data)))
  };

  const promiseConcat = (...promises) => new Promise((resolve, reject) => {
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

  const getTheRest = (firstResp) => new Promise((resolve, reject) => {
    const { total } = firstResp.result;
    const first = func.promiseResult(convertCkanResp(firstResp));
    if (total <=  chunk) {
      first.then(resolve, reject);
    } else {
      promiseConcat(first, ...getOffsets(chunk, total).map(getChunk))
        .then(resolve, reject);
    }
  });

  return new Promise((resolve, reject) => {
    notify([]);

    resourceUrl(id, {...query, limit: chunk})
      .then(fetch)
      .catch(makeHTTPErrorNice)
      .then(rejectIfNotHTTPOk)
      .then(resp => resp.json())
      .then(rejectIfNotSuccess)
      .catch(peer('init?'))
      .then(getTheRest)
      .then(peek('the rest?'))
      .then(resolve, reject);
  });


  // return resourceUrl(id, {limit: 100})
  //   .then(fetch)
  //   .catch(makeHTTPErrorNice)
  //   .then(rejectIfNotHTTPOk)
  //   .then(resp => resp.json())
  //   .then(peek('data!'))
  //   .then(rejectIfNotSuccess)
  //   .then(data => func.promiseResult(convertCkanResp(data)));
}


export default { get };
