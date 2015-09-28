import omit from 'lodash/object/omit';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/waterpoints';

/**
 * @param {object} record The waterpoint database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function pullLatLng(record) {
  const pulled = omit(record, 'LATITUDE', 'LONGITUDE');
  pulled.position = [record.LATITUDE, record.LONGITUDE];
  return pulled;
}

const WaterPointsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
  },
  loadData(data) {
    const processed = data.map(pullLatLng);
    this.setData(processed);
  },
});


export default WaterPointsStore;
