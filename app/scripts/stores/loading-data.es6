import { createStore } from 'reflux';
import saneStore from '../utils/sane-store-mixin';
import { load, loadCompleted, loadFailed } from '../actions/data';
import AsyncState from '../constants/async';


const DataLoadingStore = createStore({
  initialData: AsyncState.Finished(),
  mixins: [saneStore],
  init() {
    this.listenTo(load, 'loadStart');
    this.listenTo(loadCompleted, 'loadCompleted');
    this.listenTo(loadFailed, 'loadFailed');
  },
  loadStart() {
    this.setData(AsyncState.Active());
  },
  loadCompleted() {
    this.setData(AsyncState.Finished());
  },
  loadFailed([errKey, ...errInterp]) {
    this.setData(AsyncState.Failed({ k: errKey, i: errInterp }));
  },
});


export default DataLoadingStore;
