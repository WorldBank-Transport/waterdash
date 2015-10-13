/* eslint camelcase: 0 */  // snake_case query params are not set by us

import { Ok, Err } from 'results';
import ckan from './utils/ckan';
import { toQuery } from './utils/querystring';
import { promiseResult } from './utils/functional';
import warn from './utils/warn';

const API_ROOT = '//data.takwimu.org/api';
const resourceUrl = (id, params = {}) => promiseResult(
  toQuery({...params, resource_id: id})
    .orElse(err => {
      warn(err);
      return Err(['error.api.pre-request']);
    })
    .andThen(qs => Ok(`${API_ROOT}/action/datastore_search?${qs}`)));

// const queryUrl = q => `${API_ROOT}/action/datastore_search_sql?sql=${q}`;
const staticResource = q => `layers/${q}.json`;

const get = url =>
  fetch(url).then(resp => resp.json());

export const getWaterpoints = () =>
  resourceUrl('a94b3653-55f4-4455-9bed-42b92d5c4370', {
    limit: 500,  // TODO: fix performance and remove this limit
    fields: [
      'LATITUDE',
      'LONGITUDE',
      'POPULATION SERVED',
      'WATER_POINT_CODE',
      'WATER_POINT_NAME',
      'STATUS',
      'REGION',
    ],
  }).then(ckan.get);

export const getBoreholes = () =>
  resourceUrl('3b1d0344-1e83-4212-877e-428dd81cd802', {
    limit: 1000,
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
  }).then(ckan.get);

export const getDams = () =>
  resourceUrl('d6dcc9f8-c480-4bd0-b748-2d0b12d92396').then(ckan.get);

export const getRegions = () =>
  get(staticResource('tz_regions'));

export const getDistricts = () =>
  get(staticResource('tz_districts'));
