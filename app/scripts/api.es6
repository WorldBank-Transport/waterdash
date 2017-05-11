/* eslint camelcase: 0 */  // snake_case query params are not set by us

import ckan from './utils/api/ckan';
import * as staticData from './utils/api/static-data';
import securityApi from './utils/api/security-api';

const API_ROOT = '//data.takwimu.org/api';
const SECURITY_API_ROOT = '//api.takwimu.org/';
//const SECURITY_API_ROOT = '//localhost:9080/';
const GOOGLE_API = 'https://www.googleapis.com/';
const URL_SHORTENER = 'urlshortener/v1/url';

const WATERPOINT_DATA_URL = 'http://opendata.go.tz/api/action/datastore_search?resource_id=58edfa63-b329-45b5-b17f-27603420cd10&limit=100000';

const BOREHOLES_DATA_URL = 'http://opendata.go.tz/api/action/datastore_search?resource_id=55a55904-7cfe-4ee0-80a6-f22fb0e54159&limit=100000';

const DAMS_DATA_URL = 'http://opendata.go.tz/api/action/datastore_search?resource_id=8a98765a-ec4f-44c0-9c77-fe12f28d13f8&limit=100000';


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
  staticData.getWithPostProcess(WATERPOINT_DATA_URL, eachRecord(waterpointProcess));

export const getBoreholesStatic = () =>
  staticData.getWithPostProcess(BOREHOLES_DATA_URL);

export const getDamsStatic = () =>
  staticData.getWithPostProcess(DAMS_DATA_URL, eachRecord(damProcess));

export const getPopulationStatic = () =>
  staticData.getWithPostProcess('/data/ckan-population.json', eachRecord(toUppercase));

export const postShare = (shareData) =>
  securityApi.post(SECURITY_API_ROOT, 'share', shareData);

export const getShare = (shareId) =>
  securityApi.get(SECURITY_API_ROOT, 'share', {id: shareId});

export const urlShortener = (url) =>
  securityApi.post(GOOGLE_API, URL_SHORTENER, {longUrl: url});

export const postMap2Pdf = (body) =>
  securityApi.postAndGetFile(SECURITY_API_ROOT, 'pdf', body);
