/**
 * This store handles a lot of state- and action-related stuff
 *
 * There might be a better place for some of this, but it works here.
 */

import isUndefined from 'lodash/lang/isUndefined';
import find from 'lodash/collection/find';
import { createStore } from 'reflux';
import { Some, None, _ } from 'results';
import SaneStore from '../utils/sane-store-mixin';
// import DataTypes from '../constants/data-types';
import AsyncState from '../constants/async';
import ViewModes from '../constants/view-modes';
import select from '../actions/select';

import DataStore from './data';
import LoadingDataStore from './loading-data';
import LoadingPolygonsStore from './loading-polygons';
import PolygonsDataStore from './polygons-with-data';
import ViewStore from './view';


const maybeUndefined = v => isUndefined(v) ? None() : Some(v);


/**
 * The data stored is **just** Maybe(selected ID).
 * Everything else is recomputed in the `.get` method
 */
const SelectedStore = createStore({
  initialData: None(),
  mixins: [SaneStore],
  init() {
    // select and clear selection
    this.listenTo(select, 'selectById');

    // update when any dependencies change
    this.listenTo(DataStore, this.emit_, this);
    this.listenTo(LoadingDataStore, this.emit_, this);
    this.listenTo(LoadingPolygonsStore, this.emit_, this);
    this.listenTo(PolygonsDataStore, this.emit_, this);
    this.listenTo(ViewStore, this.emit_, this);
  },
  selectById(id) {
    this.setData(Some(id));
  },
  get() {
    // emit None() if no ID is selected, otherwise compute
    return this.data.andThen(this.getSelected);
  },
  getLoadState() {
    const pointsState = LoadingDataStore.get();
    const polysState = LoadingPolygonsStore.get();
    const { viewMode } = ViewStore.get();
    return ViewModes.match(viewMode, {
      Points: () => pointsState,
      [_]: () => pointsState.and(polysState),  // only Finished when both Finished
    });
  },
  getPointDetail(id) {
    const pointsData = DataStore.get();
    const { dataType } = ViewStore.get();
    const idField = dataType.getIdColumn();
    const q = {[idField]: id};
    const detail = find(pointsData, q);
    return maybeUndefined(detail);
  },
  getPolyDetail(id) {
    const featuresWithData = PolygonsDataStore.get();
    const detail = find(featuresWithData, {id: id});
    return maybeUndefined(detail);
  },
  getDetail(id) {
    const { viewMode } = ViewStore.get();
    return ViewModes.match(viewMode, {
      Points: () => this.getPointDetail(id),
      [_]: () => this.getPolyDetail(id),
    });
  },
  getSelected(id) {
    const loadState = this.getLoadState();
    return AsyncState.match(loadState, {
      Finished: () => ({
        id,
        loadState,
        details: this.getDetail(id),
      }),
      [_]: () => ({
        id,
        loadState,
        details: None(),
      }),
    });
  },
});

export default SelectedStore;
