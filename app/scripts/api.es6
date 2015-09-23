import 'whatwg-fetch';
import isUndefined from 'lodash/lang/isUndefined';
import { Ok, Err } from 'results';
import * as func from './utils/functional';

// CONFIGURATION

const API_ROOT = '//data.takwimu.org/api';
const converters = {
  text: t => t,
  numeric: n => parseFloat(n),
  int4: n => parseInt(n, 10),
};


// HELPERS

const resourceUrl = id => `${API_ROOT}/action/datastore_search?resource_id=${id}`;
// const queryUrl = q => `${API_ROOT}/action/datastore_search_sql?sql=${q}`;

const rejectIfNotSuccess = result => new Promise((resolve, reject) =>
  result.success ? resolve(result) : reject(result));


/**
 * @param {string} id The field name
 * @param {string} type The field type, must match something in converters
 * @returns {Result} an (id, converter) pair for converting a record key to its type
 */
function convertField({id, type}) {
  if (!isUndefined(converters[type])) {
    return Ok({[id]: converters[type]});
  } else {
    return Err(`Unknown data type for conversion: '${type}', specified for field ${id}`);
  }
}

/**
 * @param {object} fieldConverters A key:func mapping of field names to converter functions
 * @param {object} record The key:rawValue record to be converted
 * @returns {object} the record but with converted values
 */
function convertRecord(fieldConverters, record) {
  return func.Result.mapObj(([id, converter]) => {
    if (!isUndefined(record[id])) {
      return Ok({[id]: converter(record[id])});
    } else {
      return Err(`Record is missing key '${id}': ${JSON.stringify(record)}`);
    }
  }, fieldConverters);
}


/**
 * @param {object} result The CKAN raw result
 * @param {object} result.result The actual CKAN data
 * @param {array} result.result.fields The data type descriptions
 * @param {array} result.result.records The raw data records as strings
 * @returns {Promise<array>} The converted data
 */
function convertCkanResp(result) {
  const {result: {fields, records}} = result;
  const processed = func.Result
    .map(convertField, fields)
    .andThen(func.Result.merge)
    .andThen(fieldConverters =>
      func.Result.map(rec => convertRecord(fieldConverters, rec), records));
  return func.promiseResult(processed);
}

/**
 * @param {string} url The resource's url
 * @returns {Promise<array<object>>} The converted data
 */
function ckanResp(url) {
  return fetch(url)
    .then(resp => resp.json())
    .then(rejectIfNotSuccess)
    .then(convertCkanResp);
}


// publid API methods
export const getWaterpoints = () =>
  ckanResp(resourceUrl('a94b3653-55f4-4455-9bed-42b92d5c4370'));
