import { createActions } from 'reflux';
import { getPopulationStatic } from '../api';

const populationActions = createActions({
  load: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on populationActions.load()
populationActions.load.listen(() => {
  getPopulationStatic()
    .then(populationActions.loadCompleted)
    .catch(populationActions.loadFailed);
});

export default populationActions;
