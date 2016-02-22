import { createAction } from 'reflux';

const clear = createAction();
const clearFilter = createAction();
const filter = createAction();
const setRange = createAction();
const setInclude = createAction();
const setExclude = createAction();
const setPopulationServed = createAction();
const setSubcategory = createAction();
const setAllSubcategories = createAction();
const selectYear = createAction();
const selectAllYears = createAction();
const unfilter = createAction();

export default {
  clear,
  clearFilter,
  filter,
  setRange,
  setInclude,
  setExclude,
  setPopulationServed,
  setSubcategory,
  setAllSubcategories,
  selectYear,
  selectAllYears,
  unfilter,
};
