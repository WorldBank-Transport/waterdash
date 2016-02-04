import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { boundsChange } from '../actions/zoom';
import tzBounds from '../constants/tz-bounds';


const ZoomStore = createStore({
  initialData: tzBounds,
  mixins: [SaneStore],
  init() {
    this.listenTo(boundsChange, 'setMapBounds');
  },
  setMapBounds(newBounds) {
    this.setData([[newBounds._northEast.lat, newBounds._northEast.lng], [newBounds._southWest.lat, newBounds._southWest.lng]]);
  },
});

export default ZoomStore;
