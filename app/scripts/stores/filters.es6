import assign from 'object-assign';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { setSomeFilter } from '../actions/filters';


const FilterStore = createStore({
  mixins: [SaneStore],
  init() {
    this.setData({});
    this.listenTo(setSomeFilter, 'setSomeFilter');
  },
  updateData(update) {
    const updated = assign({}, this.data, update);
    this.setData(updated);
  },
  setSomeFilter(what) {
    this.updateData({someFilter: what});
  },
});


export default FilterStore;
