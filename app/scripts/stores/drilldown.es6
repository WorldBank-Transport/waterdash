import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import drillDownAction from '../actions/drilldown';
import isUndefined from 'lodash/lang/isUndefined';

const DrillDownStore = createStore({
  initialData: {
    drilldown: {field: undefined, id: undefined, drilldownField: 'REGION'}, // region by default
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(drillDownAction, this.drilldown);
  },
  drilldown(query) {
    this.setData({'drilldown': query});
  },
});

export default DrillDownStore;
