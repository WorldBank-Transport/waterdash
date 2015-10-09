/* eslint camelcase: 0 */  // snake_case query params are not set by us

import ckan from './utils/ckan';

const API_ROOT = '//data.takwimu.org/api';

// const queryUrl = q => `${API_ROOT}/action/datastore_search_sql?sql=${q}`;
const staticResource = q => `layers/${q}.json`;

const get = url =>
  fetch(url).then(resp => resp.json());


const waterpointsQ = {
  fields: [
    'LATITUDE',
    'LONGITUDE',
    'POPULATION SERVED',
    'WATER_POINT_CODE',
    'WATER_POINT_NAME',
    'STATUS',
    'REGION',
  ],
  distinct: true,
};

export const getWaterpoints = (onProgress) =>
  ckan.get(API_ROOT, 'a94b3653-55f4-4455-9bed-42b92d5c4370', waterpointsQ, onProgress);

export const getBoreholes = () =>
  ckan.get(API_ROOT, '3b1d0344-1e83-4212-877e-428dd81cd802');

export const getDams = () =>
  ckan.get(API_ROOT, 'd6dcc9f8-c480-4bd0-b748-2d0b12d92396');

export const getRegions = () =>
  get(staticResource('tz_regions'));

export const getDistricts = () =>
  get(staticResource('tz_districts'));
