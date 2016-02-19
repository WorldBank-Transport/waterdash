import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import FilteredDataStore from './filtered-data';
import { filter, unfilter } from '../actions/filters';

const PieChartDataStore = createStore({
  initialData: {
    data: [],
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(FilteredDataStore, 'recompute');
    this.listenTo(filter, 'drilldown');
    this.listenTo(unfilter, 'recompute');

  },
  recompute() {
    const { data } = FilteredDataStore.get();
    this.setData(data);
  },
  drilldown(field, value) {
    const { data } = FilteredDataStore.get();
    const filtered = data.filter(item => item[field] === value);
    this.setData(filtered);
  },
});

export default PieChartDataStore;
