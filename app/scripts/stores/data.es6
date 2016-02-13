import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { load, loadProgress, loadCompleted, loadFailed } from '../actions/data';
import DataTypes from '../constants/data-types';
import { getWaterPointsStatic, getBoreholesStatic, getDamsStatic } from '../api';

const DUMMY = [];

let CURRENT_REQUEST;

const getNextProxier = (type) => {
  CURRENT_REQUEST = {};  // reset to some unique ref
  const thisReq = CURRENT_REQUEST;  // re-bind in this scope
  return fn => (...rest) => {
    if (thisReq === CURRENT_REQUEST) {
      return fn(...rest, type);
    }  // else the request we had was no longer current, so do nothing.
  };
};

const DataStore = createStore({
  initialData: {
    waterpoints: DUMMY,
    boreholes: DUMMY,
    dams: DUMMY,
    selected: DataTypes.Waterpoints(),
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(load, 'loadIfNeeded');
    this.listenTo(loadProgress, 'loadData');
    this.listenTo(loadCompleted, 'loadData');
  },
  loadIfNeeded(type) {
    this.setData({
      ...this.get(),
      selected: type,
    });
    if (this.get()[type.toParam()] === DUMMY) {
      this.getDataFromApi(type);
    } else {
      loadCompleted(this.get()[type.toParam()], type);
    }
  },
  loadData(data, type) {
    const tmp = {
      ...this.get(),
      [type.toParam()]: data,
      selected: type,
    };
    this.setData(tmp);
  },
  getData() {
    const dataType = this.get().selected;
    return {
      dataType: dataType,
      data: this.get()[dataType.toParam()],
    };
  },

  getType() {
    return this.get().selected;
  },

  getDataFromApi(type) {
    const proxier = getNextProxier(type);
    const apiFn = DataTypes.match(type, {
      Waterpoints: () => getWaterPointsStatic,
      Boreholes: () => getBoreholesStatic,
      Dams: () => getDamsStatic,
    });
    apiFn(proxier(loadProgress))
      .then(proxier(loadCompleted))
      .catch(proxier(loadFailed));
  },
});


export default DataStore;
