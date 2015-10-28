import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { toggleCharts, toggleFilters } from '../actions/layout';
import OpenClosed from '../constants/open-closed';


const LayoutStore = createStore({
  initialData: {
    charts: OpenClosed.Closed(),
    filters: OpenClosed.Closed(),
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(toggleCharts, 'toggleCharts');
    this.listenTo(toggleFilters, 'toggleFilters');
  },
  update(what, to) {
    this.setData({
      ...this.get(),
      [what]: to,
    });
  },
  toggleCharts() {
    this.update('charts', this.get().charts.toggle());
  },
  toggleFilters() {
    this.update('filters', this.get().filters.toggle());
  },
});


export default LayoutStore;
