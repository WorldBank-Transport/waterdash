import * as func from './functional';
import { Ok, Err } from 'results';
import isUndefined from 'lodash/lang/isUndefined';


const converters = {
  text: t => t,
  numeric: n => parseFloat(n),
  int4: n => parseInt(n, 10),
};

/**
 * @param {object} ckanObj The object returned by CKAN
 * @returns {Promise<object>} resolves the object, or rejects if it's an error
 */
export function rejectIfNotSuccess(ckanObj) {
  return new Promise((resolve, reject) =>
    ckanObj.success ? resolve(ckanObj) : reject(ckanObj));
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
    return Err(`Unknown data type for conversion: '${type}', specified for field ${id}`);
  }
}

/**
 * @param {object} fieldConverters A key:func mapping of field names to converter functions
 * @param {object} record The key:rawValue record to be converted
 * @returns {object} the record but with converted values
 */
export function convertRecord(fieldConverters, record) {
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

/**
 * @param {string} url The resource's url
 * @returns {Promise<array<object>>} The converted data
 */
function get(url) {
  return fetch(url)
    .then(resp => resp.json())
    .then(rejectIfNotSuccess)
    .then(data => func.promiseResult(convertCkanResp(data)));
}

export default { get };
