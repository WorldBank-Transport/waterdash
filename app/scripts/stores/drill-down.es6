import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { chartDrilldown, mapDrillDown, disableDrillDown } from '../actions/select';

const DrillDownStore = createStore({
  initialData: {
    name: '',
    enable: false,
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(mapDrillDown, 'setDrillDown');
    this.listenTo(chartDrilldown, 'setDrillDown');
    this.listenTo(disableDrillDown, 'disableDrillDown');
  },
  setDrillDown(newView) {
    this.setData({
      name: newView,
      enable: true,
    });
  },
  disableDrillDown() {
    this.setData({
      name: '',
      enable: false,
    });
  },
});


export default DrillDownStore;
