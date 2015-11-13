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

export const select = createAction();
export const ensureSelect = createAction();  // alternate to avoid pushing extra history state
export const deselect = createAction();

const route = subPath => {
  debugger;
  const { viewMode, dataType } = ViewStore.get();
  const newViewMode = ViewModes.drillDown(viewMode)
  return `/dash/${newViewMode.toParam()}/${dataType.toParam()}/${subPath || ''}`;
};

/**
 * Navigate the browser to the URL for this selected id
 */
select.listen(id => history.pushState(null, route(id)));


/**
 * Navigate the browser 1 level up when a popup is deselected
 */
deselect.listen(() => history.pushState(null, route()));
