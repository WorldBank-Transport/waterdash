import { createActions } from 'reflux';
import { getWaterpoints } from '../api';

const waterpointActions = createActions({
  load: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on waterpointActions.load()
waterpointActions.load.listen(() => {
  getWaterpoints(waterpointActions.loadProgress)
    .then(waterpointActions.loadCompleted)
    .catch(waterpointActions.loadFailed);
});

export default waterpointActions;
