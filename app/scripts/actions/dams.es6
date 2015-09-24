import { createActions } from 'reflux';
import { getDams } from '../api';

const damsActions = createActions({
  load: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on damsActions.load()
damsActions.load.listen(() => {
  getDams()
    .then(damsActions.loadCompleted)
    .catch(damsActions.loadFailed);
});

export default damsActions;
