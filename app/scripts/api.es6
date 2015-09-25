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


export const getWaterpoints = () =>
  resourceUrl('a94b3653-55f4-4455-9bed-42b92d5c4370', {
    limit: 500,
    fields: [
      'LATITUDE',
      'LONGITUDE',
      'WATER_POINT_CODE',
      'WATER_POINT_NAME',
    ],
  }).then(ckan.get);

export const getBoreholes = () =>
  resourceUrl('3b1d0344-1e83-4212-877e-428dd81cd802').then(ckan.get);

export const getDams = () =>
  resourceUrl('d6dcc9f8-c480-4bd0-b748-2d0b12d92396').then(ckan.get);
