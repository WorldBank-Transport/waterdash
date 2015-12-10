import { createActions } from 'reflux';
import { getServedPopulation } from '../api';

const servedPopulationActions = createActions({
  load: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on servedPpopulationActions.load()
servedPopulationActions.load.listen(() => {
  getServedPopulation()
    .then(servedPopulationActions.loadCompleted)
    .catch(servedPopulationActions.loadFailed);
});

export default servedPopulationActions;
