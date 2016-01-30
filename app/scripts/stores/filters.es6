import omit from 'lodash/object/omit';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import filtersActions from '../actions/filters';
import throttleCalls from '../utils/throttle-calls';


export const inRange = ([min, max]) => v => (min <= v && v <= max);


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
  setFilter(key, f, functionName, args) {
    const updated = {
      ...this.data,
      [key]: {
        f: f,
        functionName: functionName,
        args: args,
      },
    };
    this.setData(updated);
  },
  setRange(key, [min, max]) {
    this.setFilter(key, inRange([min, max]), 'inRange', [min, max]);
  },
  setInclude(key, vals) {
    this.setFilter(key, include(vals), 'include', vals);
  },
  setExclude(key, vals) {
    this.setFilter(key, exclude(vals), 'exclude', vals);
  },
  serialize() {
    const filters = this.get();
    const serializeFilters = {};
    Object.keys(filters).forEach(field => {
      serializeFilters[field] = {functionName: filters[field].functionName, args: filters[field].args};
    });
    return serializeFilters;
  },
  deserialize(json) {
    const deserializeFilters = {};
    Object.keys(json).forEach(field => {
      const f = eval(json[field].functionName);
      deserializeFilters[field] = {
        f: f(json[field].args),
        functionName: json[field].functionName, 
        args: json[field].args
      };
    });
    this.setData(deserializeFilters);
    return deserializeFilters;
  },
});


export default FilterStore;
