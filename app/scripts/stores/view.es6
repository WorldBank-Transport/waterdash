import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import viewActions from '../actions/view';
import ViewModes from '../constants/view-modes';
import DataTypes from '../constants/data-types';
import tzBounds from '../constants/tz-bounds';


const ViewStore = createStore({
  initialData: {
    viewMode: ViewModes.Points(),
    dataType: DataTypes.Waterpoints(),
    mapBounds: tzBounds,
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(viewActions.setView, 'setView');
    this.listenTo(viewActions.setMapBounds, 'setMapBounds');
  },
  setView(newView) {
    this.setData({...this.get(), ...newView});
  },
  setMapBounds(newBounds) {
    this.setData({...this.get(), mapBounds: newBounds});
  },
});


export default ViewStore;
