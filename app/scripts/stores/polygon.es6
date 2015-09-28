import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadRegionsCompleted, loadDistrictsCompleted } from '../actions/polygon';

const PolygonsStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadRegionsCompleted, 'loadRegions');
    this.listenTo(loadDistrictsCompleted, 'loadDistricts');
  },
  loadRegions(data) {
    this.setData({regions: data});
  },
  loadDistricts(data) {
    this.setData({districts: data});
  },
});

export default PolygonsStore;
