import ckan from './utils/ckan';


const API_ROOT = '//data.takwimu.org/api';
const resourceUrl = id => `${API_ROOT}/action/datastore_search?resource_id=${id}`;
// const queryUrl = q => `${API_ROOT}/action/datastore_search_sql?sql=${q}`;


export const getWaterpoints = () =>
  ckan.get(resourceUrl('a94b3653-55f4-4455-9bed-42b92d5c4370'));
