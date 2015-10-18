import { createActions } from 'reflux';
import { getBoreholes } from '../api';

const boreholesActions = createActions({
  load: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on boreholesActions.load()
boreholesActions.load.listen(() => {
  getBoreholes(boreholesActions.loadProgress)
    .then(boreholesActions.loadCompleted)
    .catch(boreholesActions.loadFailed);
});

export default boreholesActions;
