import ckan from './utils/ckan';
import * as func from './utils/functional';

const API_ROOT = '//data.takwimu.org/api';
const resourceUrl = id => `${API_ROOT}/action/datastore_search?resource_id=${id}`;
// const queryUrl = q => `${API_ROOT}/action/datastore_search_sql?sql=${q}`;
const staticResource = q => `layers/${q}.json`;

function get(url) {
  return fetch(url).then(resp => resp.json());
}

export const getWaterpoints = () =>
  ckan.get(resourceUrl('a94b3653-55f4-4455-9bed-42b92d5c4370'));

export const getBoreholes = () =>
  ckan.get(resourceUrl('3b1d0344-1e83-4212-877e-428dd81cd802'));

export const getDams = () =>
  ckan.get(resourceUrl('d6dcc9f8-c480-4bd0-b748-2d0b12d92396'));

export const getRegions = () =>
  get(staticResource('tz_regions'));

export const getDistricts = () =>
  get(staticResource('tz_districts'));