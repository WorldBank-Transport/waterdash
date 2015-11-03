import { createActions } from 'reflux';
import { pointZoomBounds } from '../constants/tz-bounds';


const viewActions = createActions({
  setView: {},
  setMapBounds: {},
  zoomToPoint: {},
});


/**
 * Transform a zoomToPoint into a zoomToBounds
 * @param {Array<number>} latLng The point to zoom to
 * @returns {void}
 */
viewActions.zoomToPoint.listen(([lat, lon]) => {
  const [ latPad, lonPad ] = pointZoomBounds;
  const pointBounds = [
    [
      lat - latPad,
      lon - lonPad,
    ],
    [
      lat + latPad,
      lon + lonPad,
    ],
  ];
  viewActions.setMapBounds(pointBounds);
});


export default viewActions;
