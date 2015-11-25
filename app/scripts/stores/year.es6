import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/data';
import { selectYear, selectAllYears, setExclude } from '../actions/filters';
import * as func from '../utils/functional';

const YearStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
    this.listenTo(selectYear, 'changeYear');
    this.listenTo(selectAllYears, 'changeAllYears');
  },

  changeYear(year) {
    const updated = {
      ...this.data,
      [year]: !this.data[year],
    };
    this.setData(updated);
    this.excludeYear(updated);
  },

  changeAllYears(value) {
    const updated = {
      ...this.data,
    };
    Object.keys(this.data).forEach(year => {
      updated[year] = value;
    });
    this.setData(updated);
    this.excludeYear(updated);
  },

  getValuesForProperty(data, property) {
    return Object.keys(func.Result.groupBy(data, property)).reduce( (ret, value) => {
      ret[value] = true;
      return ret;
    }, {});
  },

  excludeYear(data) {
    const yearsExcluded = Object.keys(data).filter(year => !data[year]);
    setExclude('YEAR_FROM', yearsExcluded);
  },

  loadData(data) {
    this.setData(this.getValuesForProperty(data, 'YEAR_FROM'));
  },
});


export default YearStore;
