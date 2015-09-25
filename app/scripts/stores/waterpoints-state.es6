import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import actions from '../actions/waterpoints';
import { state } from '../constants/async';
const { Finished, Active, Failed } = state;


const WaterpointsStateStore = createStore({
  initialData: Finished({t: new Date()}),
  mixins: [SaneStore],
  init() {
    this.listenTo(actions.load, 'loadStarted');
    this.listenTo(actions.loadCompleted, 'loadCompleted');
    this.listenTo(actions.loadFailed, 'loadFailed');
  },
  loadStarted() {
    this.setData(Active({t: new Date()}));
  },
  loadCompleted() {
    this.setData(Finished({t: new Date()}));
  },
  loadFailed([errKey, ...errInterp]) {
    this.setData(Failed({
      t: new Date(),
      errKey,
      errInterp,
    }));
  },
});


export default WaterpointsStateStore;
