import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { load, loadProgress, loadCompleted } from '../actions/data';


const DataStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(load, 'clear');
    this.listenTo(loadProgress, 'loadData');
    this.listenTo(loadCompleted, 'loadData');
  },
  clear() {
    this.setData(this.initialData);
  },
  loadData(data) {
    this.setData(data);
  },
});


export default DataStore;
