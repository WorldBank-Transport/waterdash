import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/data';
import { setSubcategory } from '../actions/filters';
import * as func from '../utils/functional';

const CategoriesStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
    this.listenTo(setSubcategory, 'changeSubcategory');
  },

  changeSubcategory(metric, value) {
    const updated = {
      ...this.data,
    };
    updated[metric][value] = !this.data[metric][value]; // TODO check a better way to update the property
    this.setData(updated);
  },

  getValuesForProperty(data, property) {
    return Object.keys(func.Result.groupBy(data, property)).reduce( (ret, value) => {
      ret[value] = true;
      return ret;
    }, {});
  },

  loadData(data) {
    const processed = {
      HARDWARE_PROBLEM: this.getValuesForProperty(data, 'HARDWARE_PROBLEM'),
      WATER_QUALITY: this.getValuesForProperty(data, 'WATER_QUALITY'),
      WATER_QUANTITY: this.getValuesForProperty(data, 'WATER_QUANTITY'),
      SOURCE_TYPE: this.getValuesForProperty(data, 'SOURCE_TYPE'),
    };
    this.setData(processed);
  },
});


export default CategoriesStore;
