import isUndefined from 'lodash/lang/isUndefined';
import { Some, None, Ok, _ } from 'results';
import { createStore } from 'reflux';
import { Result } from '../utils/functional';
import SaneStore from '../utils/sane-store-mixin';
import FilteredDataStore from './filtered-data';
import PolygonsStore from './polygons';
import ViewStore from './view';
import colours from '../utils/colours';
import DataTypes from '../constants/data-types'
import ViewModes from '../constants/view-modes'


export const injectData = dataByLoc => polygon => {
  const dataForPoly = dataByLoc[polygon.id];
  return Ok({
    ...polygon,
    properties: {
      ...polygon.properties,
      data: isUndefined(dataForPoly) ? None() : Some(dataForPoly),
    },
  });
};

export const MAX_VALUE = 99999999;
export const MIN_VALUE = -1;

export const groupByLoc = data => locPropName =>
  Result.groupBy(data, locPropName);


export const injectDataIntoFeatures = features => dataByLoc =>
  Result.map(injectData(dataByLoc), features)
    .ok();  // convert Result<Ok,Err> to Maybe<Some,None>

export const ranges = (dataType, viewMode) => {
  if (dataType && viewMode) {
    return DataTypes.match(dataType, {
        Waterpoints: () => ViewModes.match(viewMode, {
          Points: () => [],
          Regions: () => [{min: 0, max: 2000, color: colours.few}, {min: 2001, max: 3000, color: colours.middleFew}, {min: 3001, max: 4000, color: colours.middleMany}, {min: 4001, max: MAX_VALUE, color: colours.many}],
          Districts: () => [{min: 0, max: 500, color: colours.few}, {min: 501, max: 1000, color: colours.middleFew}, {min: 1001, max: 1500, color: colours.middleMany}, {min: 1501, max: MAX_VALUE, color: colours.many}],
          Wards: () => [{min: 0, max: 500, color: colours.few}, {min: 501, max: 1000, color: colours.middleFew}, {min: 1001, max: 1500, color: colours.middleMany}, {min: 1501, max: MAX_VALUE, color: colours.many}],
        }),
        Boreholes: () => ViewModes.match(viewMode, {
          Regions: () => [{min: 0, max: 20, color: colours.few}, {min: 21, max: 30, color: colours.middleFew}, {min: 31, max: 40, color: colours.middleMany}, {min: 41, max: MAX_VALUE, color: colours.many}],
          Districts: () => [{min: 0, max: 500, color: colours.few}, {min: 501, max: 1000, color: colours.middleFew}, {min: 1001, max: 1500, color: colours.middleMany}, {min: 1501, max: MAX_VALUE, color: colours.many}],
          [_]: () => [],
        }),
        Dams: () => ViewModes.match(viewMode, {
          Regions: () => [{min: 0, max: 500, color: colours.few}, {min: 501, max: 1000, color: colours.middleFew}, {min: 1001, max: 1500, color: colours.middleMany}, {min: 1501, max: MAX_VALUE, color: colours.many}],
          Districts: () => [{min: 0, max: 500, color: colours.few}, {min: 501, max: 1000, color: colours.middleFew}, {min: 1001, max: 1500, color: colours.middleMany}, {min: 1501, max: MAX_VALUE, color: colours.many}],
          [_]: () => [],
        }),
    });
  } else {
    return [];
  }

};


const PolygonsDataStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(FilteredDataStore, 'recompute');
    this.listenTo(PolygonsStore, 'recompute');
    // don't need to listen to ViewStore: PolygonsStore will update when view changes
  },
  recompute() {
    const data = FilteredDataStore.get();
    const features = PolygonsStore.get();
    const { viewMode, dataType } = ViewStore.get();

    const dataFeatures = dataType.getLocationProp(viewMode)
      .andThen(groupByLoc(data))
      .andThen(injectDataIntoFeatures(features))
      .unwrapOr(this.initialData);

    this.setData(dataFeatures);
  },
});

export default PolygonsDataStore;
