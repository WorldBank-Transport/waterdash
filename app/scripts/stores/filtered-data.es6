import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import FilterStore from './filters';
import DataStore from './data';
import ViewStore from './view';

const items = obj => Object.keys(obj).map(k => [k, obj[k].f]);

const FilteredDataStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(DataStore, 'recompute');
    this.listenTo(FilterStore, 'recompute');
    this.listenTo(ViewStore, 'recompute');
  },
  recompute() {
    const { dataType } = ViewStore.get();
    const data = DataStore.getData(dataType);
    const filterItems = items(FilterStore.get());
    const filteredData = data.filter(record => {
      return filterItems.every(([k, f]) => {
        const key = k;
        const value = record[k];
        const ret = f(record[k]);
        return f(record[k]);
      });
    });
    this.setData(filteredData);
  },
});

export default FilteredDataStore;
