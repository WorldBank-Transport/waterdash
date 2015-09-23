import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/waterpoints';


const WaterPointsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
  },
  loadData(data) {
    this.setData(data);
    console.log('data!', data);
  },
});


export default WaterPointsStore;
