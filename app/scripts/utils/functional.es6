import { Ok } from 'results';

const reduceResult = (process, reducer, init, arr) =>
  arr.reduce((result, next) => result.andThen(current =>
    process(next).andThen(processed =>
      Ok(reducer(current, processed)))
  ), Ok(init));


const mergeTwo = (a, b) => {
  return {...a, ...b};
};

export const asArray = obj => Object.keys(obj).map(k => [k, obj[k]]);


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
export const Result = {
  map: (fn, data) => reduceResult(fn, (a, b) => a.concat(b), [], data),
  mapObj: (fn, obj) => reduceResult(fn, mergeTwo, {}, asArray(obj)),
  merge: (data) => reduceResult((v) => Ok(v), mergeTwo, {}, data),
};
