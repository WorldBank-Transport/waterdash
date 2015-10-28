import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import FilterStore from './filters';
import DataStore from './data';

const items = obj => Object.keys(obj).map(k => [k, obj[k]]);

const FilteredDataStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(DataStore, 'recompute');
    this.listenTo(FilterStore, 'recompute');
  },
  recompute() {
    const data = DataStore.get();
    const filterItems = items(FilterStore.get());
    const filteredData = data.filter(record =>
      filterItems.every(([k, f]) => f.fn(record[k])));
    this.setData(filteredData);
  },
});

export default FilteredDataStore;
