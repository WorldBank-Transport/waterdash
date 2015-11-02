import omit from 'lodash/object/omit';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import filtersActions from '../actions/filters';
import throttleCalls from '../utils/throttle-calls';


export const inRange = (min, max) => v => (min <= v && v <= max);


const withValsAsObjKeys = testFn => arr => {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }
  return v => testFn(obj, v);
};
export const include = withValsAsObjKeys((obj, v) => obj.hasOwnProperty(v));
export const exclude = withValsAsObjKeys((obj, v) => !obj.hasOwnProperty(v));


const FilterStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(filtersActions.clear, 'clear');
    this.listenTo(filtersActions.clearFilter, 'clearFilter');
    this.listenTo(filtersActions.setRange, throttleCalls(this.setRange));
    this.listenTo(filtersActions.setInclude, 'setInclude');
    this.listenTo(filtersActions.setExclude, 'setExclude');
  },
  clear() {
    this.setData(this.initialData);
  },
  clearFilter(key) {
    this.setData(omit(this.get(), key));
  },
  setFilter(key, to) {
    const updated = {
      ...this.data,
      [key]: to,
    };
    this.setData(updated);
  },
  setRange(key, [min, max]) {
    this.setFilter(key, inRange(min, max));
  },
  setInclude(key, vals) {
    this.setFilter(key, include(vals));
  },
  setExclude(key, vals) {
    this.setFilter(key, exclude(vals));
  },
});


export default FilterStore;
