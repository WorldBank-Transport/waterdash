import { createActions } from 'reflux';
import { getPopulation } from '../api';

const populationActions = createActions({
  load: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on populationActions.load()
populationActions.load.listen(() => {
  getPopulation()
    .then(populationActions.loadCompleted)
    .catch(populationActions.loadFailed);
});

export default populationActions;
