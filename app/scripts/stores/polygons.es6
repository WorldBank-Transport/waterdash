import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/polygons';

const PolygonsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadCompleted');
  },
  loadCompleted(features) {
    this.setData(features);
  },
});

export default PolygonsStore;
