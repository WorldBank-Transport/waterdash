import { createStore } from 'reflux';
import saneStore from '../utils/sane-store-mixin';
import { loadPolygons, loadCompleted, loadFailed } from '../actions/polygons';
import AsyncState from '../constants/async';


const PolygonsLoadingStore = createStore({
  initialData: AsyncState.Finished(),
  mixins: [saneStore],
  init() {
    this.listenTo(loadPolygons, 'loadStart');
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


export default PolygonsLoadingStore;
