/* eslint camelcase: 0 */  // snake_case query params are not set by us

import ckan from './utils/api/ckan';
import * as staticData from './utils/api/static-data';

const API_ROOT = '//data.takwimu.org/api';


/**
 * @param {object} record The waterpoint database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function pullLatLng(record) {
  /*
  The following slow implementation burns >400ms CPU time for me

    const pulled = omit(record, 'LATITUDE', 'LONGITUDE');
    pulled.position = [record.LATITUDE, record.LONGITUDE];
    return pulled;

  So here's a faster version (48ms):
  */
  const pulled = {};
  for (const k in record) {
    if (record.hasOwnProperty(k) && k !== 'LATITUDE' && k !== 'LONGITUDE') {
      pulled[k] = record[k];
    }
  }
  pulled.position = [record.LATITUDE, record.LONGITUDE];
  return pulled;
}


const eachRecord = fn => data => data.map(fn);


const waterpointsQ = {
  fields: [
    'LATITUDE',
    'LONGITUDE',
    'POPULATION SERVED',
    'WATER_POINT_CODE',
    'WATER_POINT_NAME',
    'STATUS',
    'REGION',
    'DISTRICT',
    'WARD',
    'VILLAGE',
    'SUB_VILLAGE',
    'HARDWARE_PROBLEM',
    'WATER_QUALITY',
    'WATER_QUANTITY',
    'SOURCE_TYPE',
  ],
  distinct: true,
};

export const getWaterpoints = (onProgress) =>
  ckan.get(API_ROOT, 'a94b3653-55f4-4455-9bed-42b92d5c4370', waterpointsQ,
    onProgress, eachRecord(pullLatLng));


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

export const getBoreholes = (onProgress) =>
  ckan.get(API_ROOT, '3b1d0344-1e83-4212-877e-428dd81cd802', boreholesQ, onProgress);


export const getDams = (onProgress) =>
  ckan.get(API_ROOT, 'd6dcc9f8-c480-4bd0-b748-2d0b12d92396', {}, onProgress, eachRecord(pullLatLng));


export const getRegions = () =>
  staticData.getPolygons('/layers/tz_regions.json', 'tz_Regions');

export const getDistricts = () =>
  staticData.getPolygons('/layers/tz_districts.json', 'tz_districts');

export const getWards = () =>
  staticData.getPolygons('/layers/tz_wards.json', 'TzWards');

export const getPopulation = () =>
  staticData.getJson('/layers/tz_population.json');
