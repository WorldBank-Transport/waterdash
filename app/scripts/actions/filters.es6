import { createAction } from 'reflux';

const clear = createAction();
const clearFilter = createAction();
const setRange = createAction();
const setInclude = createAction();
const setExclude = createAction();
const setPopulationServed = createAction();
const setSubcategory = createAction();
const setAllSubcategory = createAction();


export default {
  clear,
  clearFilter,
  setRange,
  setInclude,
  setExclude,
  setPopulationServed,
  setSubcategory,
  setAllSubcategory,
};
