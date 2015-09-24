import { Ok } from 'results';

/**
 * @param {func} process A transformation to apply to each element of data
 *    This function must accept elements from data and return a Result.Ok or Result.Err
 * @param {func} reducer A function for merging a newly transformed value for output
 *    This function should fold the new value into the accumulator
 *    It gets the raw unwrapped value from an Ok() from `process`.
 *    If `process` returned a Result.Err, the whole reduceResult becomes that Err,
 *    so this function would never see it.
 *    This function returns the new accumulator value.
 * @param {any} init The initial accumulator value
 * @param {array<any>} data The array of data to be processed.
 * @returns {Result<any>} The accumulated value in an Result.Ok,
 *    or any Result.Err from `process`.
 */
function reduceResult(process, reducer, init, data) {
  return data.reduce((result, next) => result.andThen(current =>
    process(next).andThen(processed =>
      Ok(reducer(current, processed)))
  ), Ok(init));
}


const mergeTwo = (a, b) => {
  return {...a, ...b};  // returns a shallow merge without mutating a or b.
};


/**
 * @param {object} obj The object to split into an array of [k, v] pairs
 * @returns {array<array>} An array of pairs of key/value from obj
 */
function asArray(obj) {
  return Object.keys(obj)
    .map(k => [k, obj[k]]);
}


/**
 * @param {Result<T>} result An Ok() or Err() from `results`
 * @returns {Promise<T>} A promise that resolves Ok or rejects Err.
 */
export function promiseResult(result) {
  return new Promise((resolve, reject) => result.match({
    Ok: resolve,
    Err: reject,
  }));
}


// Result type helpers
export const Result = {};

/**
 * @param {func} fn A function to process a single item and
 *    return a Result.Ok wrapping a result, or Result.Err with a reason why.
 * @param {array<any>} data The data to process with {func}
 * @returns {Result<array<any>>} The processed data in a Result.Ok or a Result.Err
 */
Result.map = (fn, data) => reduceResult(fn, (a, b) => a.concat(b), [], data);

/**
 * @param {func} fn A function to process a single key/value pair (passed as [k, v]),
 *    and return a Result.Ok wrapping a {k: v} result, or Result.Err with a reason why.
 * @param {object} obj The data to process with {func}
 * @returns {Result<object>} The processed data in a Result.Ok or a Result.Err
 */
Result.mapMergeObj = (fn, obj) => reduceResult(fn, mergeTwo, {}, asArray(obj));

/**
 * @param {func} fn A function to process a single key/value pair (passed as [k, v]),
 *    and return a Result.Ok wrapping a {k: v} result, or Result.Err with a reason why.
 * @param {object} obj The data to process with {func}
 * @returns {Result<array>} The processed data in a Result.Ok or a Result.Err
 */
Result.mapObj = (fn, obj) => reduceResult(fn, (a, b) => a.concat(b), [], asArray(obj));

/**
 * @param {array<object>} data Some objects to be merged and wrapped in Result.Ok
 * @returns {Result<object>} The merged object in a Result.Ok
 */
Result.merge = (data) => reduceResult((v) => Ok(v), mergeTwo, {}, data);