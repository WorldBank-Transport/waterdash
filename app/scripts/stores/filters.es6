import throttle from 'lodash/function/throttle';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import filtersActions from '../actions/filters';


const FilterStore = createStore({
  initialData: {
    populationServed: [0, 10000],
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(filtersActions.setPopulationServed, throttle(range =>
      this.populationServed(range), 333, {leading: true, trailing: true}));
  },
  updateData(key, to) {
    const updated = {
      ...this.data,
      [key]: to,
    };
    this.setData(updated);
  },
  populationServed([min, max]) {
    this.updateData('populationServed', [min, max]);
  },
});


export default FilterStore;
