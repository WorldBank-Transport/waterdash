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

const log = id => payload => console.info(id, payload);

waterpointActions.load.listen(log('LOAD'));
waterpointActions.loadProgress.listen(log('PROGRESS'));
waterpointActions.loadCompleted.listen(log('Completed'));
waterpointActions.loadFailed.listen(log('FAILED'));

export default waterpointActions;
