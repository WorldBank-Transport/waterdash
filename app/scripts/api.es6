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


const boreholesQ = {
  fields: [
    'REGION',
    'DISTRICT',
    'LOCATION',
    'BOREHOLE_NO',
    'RIG_NO',
    'DIAMETER',
    'DEPTH_METER',
    'STATIC_WATER_LEVEL',
    'DYNAMIC_WATER_LEVEL_METER',
    'DRAW _DOWN_METER',
    'YIELD_METER_CUBED_PER_HOUR',
    'DATE_OF_COMMENCEMENT',
    'DATE_OF_COMPLETION',
    'ELECTRICAL_CONDUCTIVITY',
    'CONSULTANT',
    'YEAR_FROM',
    'YEAR_TO',
  ],
};

const damsQ = {
  fields: [
    'REGION',
    'DISTRICT',
    'DAM_NAME',
    'BASIN',
    'DAM_HEIGHT',
    'ELEVATION_',
    'RESERVOIR_',
    'LONGITUDE',
    'LATITUDE',
  ],
};

export const getBoreholes = (onProgress) =>
  ckan.get(API_ROOT, '3b1d0344-1e83-4212-877e-428dd81cd802', boreholesQ, onProgress);

export const getDams = (onProgress) =>
  ckan.get(API_ROOT, '5da4eb70-47a0-4694-b735-397bb3732b99', damsQ, onProgress);

export const getRegions = () =>
  get(staticResource('tz_regions'));

export const getDistricts = () =>
  get(staticResource('tz_districts'));
