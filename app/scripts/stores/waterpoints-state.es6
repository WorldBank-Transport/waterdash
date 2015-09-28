import createAsyncStateStore from '../utils/async-state-store';
import actions from '../actions/waterpoints';

const WaterpointsStateStore = createAsyncStateStore({
  start: actions.load,
  end: actions.loadCompleted,
  fail: actions.loadFailed,
});

export default WaterpointsStateStore;
