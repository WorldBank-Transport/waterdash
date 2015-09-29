import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import FilterStore from './filters';
import WaterPointsStore from './waterpoints';


const FilteredWaterpointsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(WaterPointsStore, 'recompute');
    this.listenTo(FilterStore, 'recompute');
  },
  recompute() {
    const waterpoints = WaterPointsStore.get();
    const filters = FilterStore.get();
    const [popMin, popMax] = filters.populationServed;
    const filteredWaterpoints = waterpoints.filter((waterpoint) => {
      return (
        waterpoint['POPULATION SERVED'] >= popMin &&
        waterpoint['POPULATION SERVED'] <= popMax
      );
    });
    this.setData(filteredWaterpoints);
  },
});

export default FilteredWaterpointsStore;
