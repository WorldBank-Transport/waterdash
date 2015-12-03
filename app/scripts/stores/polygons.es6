import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted, loadPolygons, loadProgress, loadFailed } from '../actions/polygons';
import ViewModes from '../constants/view-modes';
import { getRegions, getDistricts, getWards } from '../api';

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
const DUMMY = [];

const getNextProxier = (type) => {
  CURRENT_REQUEST = {};  // reset to some unique ref
  const thisReq = CURRENT_REQUEST;  // re-bind in this scope
  return fn => (...rest) => {
    if (thisReq === CURRENT_REQUEST) {
      return fn(...rest, type);
    }  // else the request we had was no longer current, so do nothing.
  };
};

const PolygonsStore = createStore({
  initialData: {
    regions: DUMMY,
    districts: DUMMY,
    wards: DUMMY,
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(loadProgress, 'loadPoly');
    this.listenTo(loadCompleted, 'loadPoly');
    this.listenTo(loadPolygons, 'loadIfNeeded');
  },

  loadPolygon(type) {
    const proxier = getNextProxier(type);
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
  },

  loadPoly(features, type) {
    const tmp = {
      ...this.get(),
      [type.toParam()]: features,
    };
    this.setData(tmp);
  },

  loadIfNeeded(type) {
    if (this.get()[type.toParam()] === DUMMY) {
      this.loadPolygon(type);
    } else {
      loadCompleted(this.get()[type.toParam()], type);
    }
  },

  getPolygon(type) {
    return this.get()[type.toParam()];
  },
});

export default PolygonsStore;
