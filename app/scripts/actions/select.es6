/**
 * So maybe this is a bit of a hacky way to do this, but it works:
 *
 * When a layer or point is selected, we check the current data type and view
 * type, and navigate the user to the route for that selected point.
 *
 * This way, the selected state is persisted through the URL, so this action is
 * the same, as far as the app is concerned, as someone hitting forward/back or
 * opening the page from the selected URL directly.
 *
 * We have to import the view store to know how to construct the URL, which is
 * ugly, but, ¯\_(ツ)_/¯
 */
import { createAction } from 'reflux';
import history from '../history';
import ViewStore from '../stores/view';
import ViewModes from '../constants/view-modes';
import { setInclude, setExclude } from './filters';

export const select = createAction();
export const ensureSelect = createAction();  // alternate to avoid pushing extra history state
export const deselect = createAction();
export const chartDrilldown = createAction();
export const mapDrillDown = createAction();
export const disableDrillDown = createAction();

const drillDownRoute = (viewMode, dataType, id) => {
  return `/dash/${viewMode.toParam()}/${dataType.toParam()}/${id || ''}`;
};

/**
 * Navigate the browser to the URL for this selected id
 */
//select.listen(id => history.pushState(null, route(id)));


/**
 * Navigate the browser 1 level up when a popup is deselected
 */
//deselect.listen(() => history.pushState(null, route()));

mapDrillDown.listen(id => {
  const { viewMode, dataType } = ViewStore.get();
  const ddViewMode = ViewModes.drillDown(viewMode);
  history.pushState(null, drillDownRoute(ddViewMode, dataType));
  dataType.getLocationProp(viewMode).andThen(locProp => {
    setInclude(locProp, [id]);
  });
});

/**
 * drill down to the next level in the map
 */
chartDrilldown.listen(id => {
  const { viewMode, dataType } = ViewStore.get();
  const tmpViewMode = viewMode.chartCorrection();
  const ddViewMode = ViewModes.drillDown(tmpViewMode);
  history.pushState(null, drillDownRoute(ddViewMode, dataType));
  dataType.getLocationProp(tmpViewMode).andThen(locProp => {
    setInclude(locProp, [id]);
  });
});

disableDrillDown.listen(id => {
  const { viewMode, dataType } = ViewStore.get();
  setExclude('REGION', []);
  setExclude('DISTRICT', []);
  setExclude('WARD', []);
  history.pushState(null, `/dash/points/${dataType.toParam()}/`);
});
