/* eslint camelcase: 0 */  // snake_case query params are not set by us

import ckan from './utils/api/ckan';
import * as staticData from './utils/api/static-data';
import securityApi from './utils/api/security-api';

const API_ROOT = '//data.takwimu.org/api';
const SECURITY_API_ROOT = '//api.takwimu.org/';
const GOOGLE_API = 'https://www.googleapis.com/';
const URL_SHORTENER = 'urlshortener/v1/url';

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
/**
 * add a POINT_ID and parse the geolocation for a waterpoint
 * @param {object} record The waterpoint database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function waterpointProcess(record) {
  const pulled = pullLatLng(record);
  pulled.POINT_ID = pulled.WATER_POINT_CODE;
  return pulled;
}
/**
 * add a POINT_ID and parse the geolocation for a dams
 * @param {object} record The dam database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function damProcess(record) {
  const pulled = pullLatLng(record);
  pulled.POINT_ID = pulled.DAM_NAME;
  return pulled;
}

/**
 * @param {object} record The population database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function toUppercase(record) {
  const pulled = {};
  for (const k in record) {
    if (record.hasOwnProperty(k)) {
      pulled[k] = (typeof record[k] === 'string') ? record[k].toUpperCase() : record[k];
    }
  }
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
    'STATUS_GROUP',
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
    onProgress, eachRecord(waterpointProcess));


const boreholesQ = {
  fields: [
    'REGION',
    'DISTRICT',
    'LOCATION',
    'BOREHOLE_NO',
    'DIAMETER',
    'DEPTH_METER',
    'STATIC_WATER_LEVEL',
    'DYNAMIC_WATER_LEVEL_METER',
    'DRAW _DOWN_METER',
    'YIELD_METER_CUBED_PER_HOUR',
    'ELECTRICAL_CONDUCTIVITY',
    'CONSULTANT',
    'YEAR_FROM',
    'YEAR_TO',
  ],
};

export const getBoreholes = (onProgress) =>
  ckan.get(API_ROOT, 'c9843a61-eca6-47bb-971d-70bf9c0fe942', boreholesQ, onProgress);

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

export const getDams = (onProgress) =>
  ckan.get(API_ROOT, '5da4eb70-47a0-4694-b735-397bb3732b99', damsQ, onProgress, eachRecord(damProcess));

const populationQ = {
  fields: [
    'REGION',
    'DISTRICT',
    'WARD',
    'VILLAGE',
    'TOTAL',
  ],
};

export const getPopulation = (onProgress) =>
  ckan.get(API_ROOT, 'ab84afa2-0afa-411e-9630-aeddc7bccb03', populationQ, onProgress, eachRecord(toUppercase));

const servedPopulationQ = {
  fields: [
    'YEAR',
    'RURAL_POPULATION',
    'POPULATION_SERVED',
    'PERCENTAGE',
  ],
};

export const getServedPopulation = (onProgress) =>
  ckan.get(API_ROOT, 'c267883f-ffcf-4f9c-a7f1-887451236134', servedPopulationQ, onProgress);

export const getRegions = () =>
  staticData.getPolygons('layers/tz_regions.json', 'tz_Regions');

export const getDistricts = () =>
  staticData.getPolygons('layers/tz_districts.json', 'tz_districts');

export const getWards = () =>
  staticData.getPolygons('layers/tz_wards.json', 'TzWards');

export const getWaterPointsStatic = () =>
  staticData.getWithPostProcess('/data/ckan-waterpoints.json', eachRecord(waterpointProcess));

export const getBoreholesStatic = () =>
  staticData.getWithPostProcess('/data/ckan-boreholes.json');

export const getDamsStatic = () =>
  staticData.getWithPostProcess('/data/ckan-dams.json', eachRecord(damProcess));

export const getPopulationStatic = () =>
  staticData.getWithPostProcess('/data/ckan-population.json', eachRecord(toUppercase));

export const postShare = (shareData) =>
  securityApi.post(SECURITY_API_ROOT, 'share', shareData);

export const getShare = (shareId) =>
  securityApi.get(SECURITY_API_ROOT, 'share', {id: shareId});

export const urlShortener = (url) =>
  securityApi.post(GOOGLE_API, URL_SHORTENER, {longUrl: url});
