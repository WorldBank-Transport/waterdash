import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { changeRange } from '../actions/range';
import { setRange, clear } from '../actions/filters';

const RangeStore = createStore({
  initialData: {
    'POPULATION SERVED': [0, 10000],
    DIAMETER: [0, 50],
    DEPTH_METER: [6, 400],
    STATIC_WATER_LEVEL: [0, 148.5],
    DYNAMIC_WATER_LEVEL_METER: [0, 174.22],
    'DRAW _DOWN_METER': [0, 120.49],
    YIELD_METER_CUBED_PER_HOUR: [0.66, 104.3],
    DAM_HEIGHT: [0, 42.672],
    ELEVATION_: [7, 2004],
    RESERVOIR_: [100000, 1140000000],
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(changeRange, 'update');
    this.listenTo(clear, 'reset');
  },
  update(field, [ newMin, newMax ]) {
    const newState = {
      ...this.get(),
      [field]: [ newMin, newMax ],
    };
    this.setData(newState);
    setRange(field, [ newMin, newMax ]);
  },
  reset() {
    this.setData(this.initialData);
  },
});

export default RangeStore;
