import { createActions } from 'reflux';
import ViewModes from '../constants/view-modes';
import { getRegions, getDistricts, getWards } from '../api';


const polygonActions = createActions({
  clearPolygons: {},
  loadPolygons: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
});


// Inject the api request promise instead of the point type
polygonActions.loadPolygons.preEmit = type =>
  ViewModes.match(type, {
    Regions: () => getRegions(polygonActions.loadProgress),
    Districts: () => getDistricts(polygonActions.loadProgress),
    Wards: () => getWards(polygonActions.loadProgress),
    Points: () => {
      throw new Error('Cannot load polygons for points');
    },
  });


// Wire up the completed and failed actions to the promise's result
polygonActions.loadPolygons.listen(dataPromise =>
  dataPromise
    .then(polygonActions.loadCompleted)
    .catch(polygonActions.loadFailed));


export default polygonActions;
