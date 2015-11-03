import { createAction } from 'reflux';
import ViewModes from '../constants/view-modes';
import { getRegions, getDistricts, getWards } from '../api';


export const clearPolygons = createAction();
export const loadPolygons = createAction();
export const loadProgress = createAction();
export const loadCompleted = createAction();
export const loadFailed = createAction();


/**
 * From here on is logic to start the request, and hook events up
 * to the last-started request.
 *
 * All this proxying mess is just to make sure that if a new
 * request starts before the last one had finished, we stop
 * listening to events from the last one (eg., if it completes
 * before the new one does).
 */
let CURRENT_REQUEST;

const getNextProxier = () => {
  CURRENT_REQUEST = {};  // reset to some unique ref
  const thisReq = CURRENT_REQUEST;  // re-bind in this scope
  return fn => (...rest) => {
    if (thisReq === CURRENT_REQUEST) {
      return fn(...rest);
    }  // else the request we had was no longer current, so do nothing.
  };
};

// Wire up the completed and failed actions to the most recent promise's result
loadPolygons.listen(type => {
  const proxier = getNextProxier();
  const apiFn = ViewModes.match(type, {
    Regions: () => getRegions,
    Districts: () => getDistricts,
    Wards: () => getWards,
    Points: () => {
      throw new Error('Cannot load polygons for points');
    },
  });
  apiFn(proxier(loadProgress))
    .then(proxier(loadCompleted))
    .catch(proxier(loadFailed));
});
