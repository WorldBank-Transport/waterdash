import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import FilterStore from './filters';
import WaterPointsStore from './waterpoints';
import DrillDownStore from './drilldown';
import isUndefined from 'lodash/lang/isUndefined';

const FilteredWaterpointsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(WaterPointsStore, 'recompute');
    this.listenTo(FilterStore, 'recompute');
    this.listenTo(DrillDownStore, 'recompute');
  },
  recompute() {
    const waterpoints = WaterPointsStore.get();
    const filters = FilterStore.get();
    const {drilldown} = DrillDownStore.get();
    const drilldownFitler = (waterpoint) => {
      if (isUndefined(drilldown.id)) {
        return true;
      } else if(waterpoint[drilldown.field] === drilldown.id) {
        return true;
      } else {
        return false;
      }
    };
    const [popMin, popMax] = filters.populationServed;
    const filteredWaterpoints = waterpoints.filter((waterpoint) => {
      return (
        waterpoint['POPULATION SERVED'] >= popMin &&
        waterpoint['POPULATION SERVED'] <= popMax &&
        drilldownFitler(waterpoint)
      );
    });
    this.setData(filteredWaterpoints);
  },
});

export default FilteredWaterpointsStore;
