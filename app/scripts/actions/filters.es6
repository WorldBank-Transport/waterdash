import { createAction } from 'reflux';

const clear = createAction();
const clearFilter = createAction();
const setRange = createAction();
const setInclude = createAction();
const setExclude = createAction();


export default {
  clear,
  clearFilter,
  setRange,
  setInclude,
  setExclude,
};
