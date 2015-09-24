import { Ok, Err } from 'results';
import { Result } from './functional';
import warn from './warn';


/**
 * Get a CKAN-friendly query string
 * @param {any} thing The right-hand side of a k=v in the querystring
 * @returns {string} A url-ready right-hand side for the querystring
 */
function queryVal(thing, recursed = false) {
  if (typeof thing === 'string') {
    if (/,/.test(thing)) {
      return Err(`Cannot querystringify a string with commas: ${thing}`);
    } else {
      return Ok(thing);
    }
  } else if (typeof thing === 'number') {
    return Ok(String(thing));
  } else if (thing instanceof Array) {
    if (recursed) {
      return Err(`Cannot querystringify recursive array. Inner array: ${JSON.stringify(thing)}`);
    } else {
      return Result
        .map(t => queryVal(t, true), thing)
        .andThen(arr => Ok(arr.join(',')));
    }
  } else {
    warn(`adding unknown thing of type ${typeof thing} to querystring as '${String(thing)}':`, thing);
    return Ok(String(thing));
  }
}

/**
 * @param {object} obj The keys and values to put in the querystring
 * @returns {Result<string>} A string ready for a url
 */
function toQuery(obj) {
  return Result
    .mapObj(([k, v]) =>
        queryVal(v).andThen(qv => Ok(`${k}=${qv}`)), obj)
      .andThen(qsArray => {
        return Ok(qsArray.join('&'));
      });
}

export { queryVal, toQuery };
