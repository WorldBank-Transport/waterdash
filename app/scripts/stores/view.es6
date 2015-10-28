import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import viewActions from '../actions/view';
import ViewModes from '../constants/view-modes';
import DataTypes from '../constants/data-types';


const ViewStore = createStore({
  initialData: {
    viewMode: ViewModes.Points(),
    dataType: DataTypes.Waterpoints(),
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(viewActions.setView, 'setView');
  },
  setView(newView) {
    this.setData(newView);
  },
});


export default ViewStore;
