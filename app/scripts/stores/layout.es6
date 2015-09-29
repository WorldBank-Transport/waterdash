import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { toggleCharts } from '../actions/layout';
import { charts } from '../constants/layout';


const LayoutStore = createStore({
  initialData: {
    charts: charts.Closed(),
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(toggleCharts, 'toggleCharts');
  },
  update(what, to) {
    this.setData({
      ...this.get(),
      [what]: to,
    });
  },
  toggleCharts() {
    this.update('charts', this.get().charts.match({
      Open: () => charts.Closed(),
      Closed: () => charts.Open(),
    }));
  },
});


export default LayoutStore;
