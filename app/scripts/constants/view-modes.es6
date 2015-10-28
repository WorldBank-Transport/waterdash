import { Union } from 'results';

const ViewModes = Union({
  Points: {},
  Wards: {},
  Districts: {},
  Regions: {},
}, {  // option instance methods
  toParam() {
    return this.name.toLowerCase();
  },
}, {  // ViewModes static methods
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
});

export default ViewModes;
