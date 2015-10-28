import { createActions } from 'reflux';
import DataTypes from '../constants/data-types';
import { getWaterpoints, getBoreholes, getDams } from '../api';


const dataActions = createActions({
  load: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
});


// Inject the api request promise instead of the point type
dataActions.load.preEmit = type =>
  DataTypes.match(type, {
    Waterpoints: () => getWaterpoints(dataActions.loadProgress),
    Boreholes: () => getBoreholes(dataActions.loadProgress),
    Dams: () => getDams(dataActions.loadProgress),
  });


// Wire up the completed and failed actions to the promise's result
dataActions.load.listen(dataPromise =>
  dataPromise
    .then(dataActions.loadCompleted)
    .catch(dataActions.loadFailed));


export default dataActions;
