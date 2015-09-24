import { createActions } from 'reflux';
import { getBoreholes } from '../api';

const boreholesActions = createActions({
  load: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on boreholesActions.load()
boreholesActions.load.listen(() => {
  getBoreholes()
    .then(boreholesActions.loadCompleted)
    .catch(boreholesActions.loadFailed);
});

export default boreholesActions;
