import omit from 'lodash/object/omit';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import FilterTypes from '../constants/filter-types';
import filtersActions from '../actions/filters';
import throttleCalls from '../utils/throttle-calls';


const inRange = (min, max) => v => (min <= v && v <= max);


const withValsAsObjKeys = testFn => arr => {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }
  return v => testFn(obj, v);
};
const include = withValsAsObjKeys((obj, v) => obj.hasOwnProperty(v));
const exclude = withValsAsObjKeys((obj, v) => !obj.hasOwnProperty(v));


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
    this.setFilter(key, {
      type: FilterTypes.Range(),
      fn: inRange(min, max),
    });
  },
  setInclude(key, vals) {
    this.setFilter(key, {
      type: FilterTypes.Include(),
      fn: include(vals),
    });
  },
  setExclude(key, vals) {
    this.setFilter(key, {
      type: FilterTypes.Exclude(),
      fn: exclude(vals),
    });
  },
});


// export filter functions for tests
FilterStore.inRange = inRange;
FilterStore.include = include;
FilterStore.exclude = exclude;


export default FilterStore;
