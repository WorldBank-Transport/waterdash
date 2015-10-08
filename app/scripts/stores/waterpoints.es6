import omit from 'lodash/object/omit';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadProgress, loadCompleted } from '../actions/waterpoints';

/**
 * @param {object} record The waterpoint database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function pullLatLng(record) {
  /*
  The following slow implementation burns >400ms CPU time for me

    const pulled = omit(record, 'LATITUDE', 'LONGITUDE');
    pulled.position = [record.LATITUDE, record.LONGITUDE];
    return pulled;

  So here's a faster version (48ms):
  */
  const pulled = {};
  for (let k in record) {
    if (record.hasOwnProperty(k) && k !== 'LATITUDE' && k != 'LONGITUDE') {
      pulled[k] = record[k];
    }
  }
  pulled.position = [record.LATITUDE, record.LONGITUDE];
  return pulled;
}

const WaterpointsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadProgress, 'loadData');
    this.listenTo(loadCompleted, 'loadData');
  },
  loadData(data) {
    const processed = data.map(pullLatLng);
    this.setData(processed);
  },
});


export default WaterpointsStore;
