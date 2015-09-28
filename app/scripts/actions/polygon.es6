import { createActions } from 'reflux';
import { getRegions, getDistricts } from '../api';

const polygonActions = createActions({
  loadRegions: {},
  loadRegionsCompleted: {},
  loadRegionsFailed: {},
  loadDistricts: {},
  loadDistrictsCompleted: {},
  loadDistrictsFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on polygonActions.loadRegions()
polygonActions.loadRegions.listen(() => {
  getRegions()
    .then(polygonActions.loadRegionsCompleted)
    .catch(polygonActions.loadRegionsFailed);
});

// SIDE-EFFECT: xhr request is triggered on polygonActions.loadDistricts()
polygonActions.loadDistricts.listen(() => {
  getDistricts()
    .then(polygonActions.loadDistrictsCompleted)
    .catch(polygonActions.loadDistrictsFailed);
});

export default polygonActions;
