/* eslint camelcase: 0 */

import ckan from './utils/ckan';

const queryStringify = thing => {
  if (typeof thing === 'string') {
    if (/,/.test(thing)) {
      throw new Error('cannot querystringify a string containing commas :(');
    }
    return thing;
  } else if (typeof thing === 'number') {
    return String(thing);
  } else if (thing instanceof Array) {
    return thing
      .map(queryStringify)
      .join(',');
  }
};

const toQuery = obj => Object.keys(obj)
  .map(k => `${k}=${queryStringify(obj[k])}`)
  .join('&');

const API_ROOT = '//data.takwimu.org/api';
const resourceUrl = (id, params = {}) =>
  `${API_ROOT}/action/datastore_search?${toQuery({...params, resource_id: id})}`;
// const queryUrl = q => `${API_ROOT}/action/datastore_search_sql?sql=${q}`;
const staticResource = q => `layers/${q}.json`;

const get = url =>
  fetch(url).then(resp => resp.json());

export const getWaterpoints = () =>
  ckan.get(resourceUrl('a94b3653-55f4-4455-9bed-42b92d5c4370', {
    limit: 1000,
    fields: [
      'LATITUDE',
      'LONGITUDE',
      'WATER_POINT_CODE',
      'WATER_POINT_NAME',
    ],
  }));

export const getBoreholes = () =>
  ckan.get(resourceUrl('3b1d0344-1e83-4212-877e-428dd81cd802'));

export const getDams = () =>
  ckan.get(resourceUrl('d6dcc9f8-c480-4bd0-b748-2d0b12d92396'));

export const getRegions = () =>
  get(staticResource('tz_regions'));

export const getDistricts = () =>
  get(staticResource('tz_districts'));
