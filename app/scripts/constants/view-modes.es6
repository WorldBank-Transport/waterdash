import { Union, _ } from 'results';

const ViewModes = Union({
  Points: {},
  Wards: {},
  Districts: {},
  Regions: {},
}, {
  // option instance methods
  equals(other) {
    if (!(other instanceof ViewModes.OptionClass)) {
      return false;
    } else {
      return other.name === this.name;
    }
  },
  toParam() {
    return this.name.toLowerCase();
  },
  chartCorrection() {
    return ViewModes.match(this, {
      Points: () => ViewModes.Regions(),
      [_]: () => this,
    });
  },
}, {
  // ViewModes static methods
  fromParam(param) {
    if (param === 'points') {
      return ViewModes.Points();
    } else if (param === 'wards') {
      return ViewModes.Wards();
    } else if (param === 'districts') {
      return ViewModes.Districts();
    } else if (param === 'regions') {
      return ViewModes.Regions();
    } else {
      throw new Error(`Could not get ViewModes type for param '${param}'`);
    }
  },
  getDrillDown(viewMode) {
    return ViewModes.match(viewMode, {
      Points: () => 'REGION',
      Regions: () => 'REGION',
      Districts: () => 'DISTRICT',
      Wards: () => 'WARDS',
    });
  },
  drillDown(viewMode) {
    return ViewModes.match(viewMode, {
        Points: () => ViewModes.Districts(),  // Could not drill down from points
        Regions: () => ViewModes.Districts(),
        Districts: () => ViewModes.Wards(),
        Wards: () => ViewModes.Points(),
      });
  },
});

export default ViewModes;
