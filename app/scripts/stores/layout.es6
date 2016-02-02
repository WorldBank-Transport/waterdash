import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { toggleCharts, toggleFilters, toggleCategories, toggleYear } from '../actions/layout';
import OpenClosed from '../constants/open-closed';


const LayoutStore = createStore({
  initialData: {
    charts: OpenClosed.Closed(),
    filters: OpenClosed.Closed(),
    categories: OpenClosed.Closed(),
    year: OpenClosed.Closed(),
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(toggleCharts, 'toggleCharts');
    this.listenTo(toggleFilters, 'toggleFilters');
    this.listenTo(toggleCategories, 'toggleCategories');
    this.listenTo(toggleYear, 'toggleYear');
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
  toggleCategories() {
    this.update('categories', this.get().categories.toggle());
  },
  toggleYear() {
    this.update('year', this.get().year.toggle());
  },
});


export default LayoutStore;
