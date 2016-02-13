import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import FilterStore from './filters';
import DataStore from './data';
import DataTypes from '../constants/data-types';

const items = obj => Object.keys(obj).map(k => [k, obj[k].f]);

const FilteredDataStore = createStore({
  initialData: {
    data: [],
    dataType: DataTypes.Waterpoints(),
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(DataStore, 'recompute');
    this.listenTo(FilterStore, 'recompute');
  },
  recompute() {
    const { dataType, data} = DataStore.getData();
    const filterItems = items(FilterStore.get());
    let tmpData = data;
    if (filterItems.length > 0) {
      const filteredData = data.filter(record => filterItems.every(([k, f]) => f(record[k])));
      tmpData = filteredData;
    }
    this.setData({
      dataType: dataType,
      data: tmpData,
    });
  },
});

export default FilteredDataStore;
