import { createActions } from 'reflux';
import { getRegions, getDistricts } from '../api';

const polygonActions = createActions({
  loadRegions: {},
  loadRegionsCompleted: {},
  loadDistricts: {},
  loadDistrictsCompleted: {},
});

// SIDE-EFFECT: xhr request is triggered on polygonActions.loadRegions()
polygonActions.loadRegions.listen(() => {
  getRegions()
    .then(polygonActions.loadRegionsCompleted);
});

// SIDE-EFFECT: xhr request is triggered on polygonActions.loadDistricts()
polygonActions.loadDistricts.listen(() => {
  getDistricts()
    .then(polygonActions.loadDistrictsCompleted);
});

export default polygonActions;
