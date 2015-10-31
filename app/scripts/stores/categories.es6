import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/data';
import { setSubcategory, setAllSubcategories, setExclude } from '../actions/filters';
import * as func from '../utils/functional';

const CategoriesStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
    this.listenTo(setSubcategory, 'changeSubcategory');
    this.listenTo(setAllSubcategories, 'changeAllSubcategories');
  },

  changeSubcategory(category, subcategory) {
    const updated = {
      ...this.data,
    };
    updated[category][subcategory] = !this.data[category][subcategory]; // TODO check a better way to update the property
    this.setData(updated);
    this.excludeCategory(updated, category);
  },

  changeAllSubcategories(category, value) {
    const updated = {
      ...this.data,
    };
    Object.keys(updated[category]).forEach(subcategory => {
      updated[category][subcategory] = value;
    });
    this.setData(updated);
    this.excludeCategory(updated, category);
  },

  getValuesForProperty(data, property) {
    return Object.keys(func.Result.groupBy(data, property)).reduce( (ret, value) => {
      ret[value] = true;
      return ret;
    }, {});
  },

  excludeCategory(data, category) {
    const subcategoryExcluded = Object.keys(data[category]).filter(subcategory => !data[category][subcategory]);
    setExclude(category, subcategoryExcluded);
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
