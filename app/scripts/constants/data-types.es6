import { Union } from 'results';

const DataTypes = Union({
  Waterpoints: {},
  Boreholes: {},
  Dams: {},
}, {  // option instance methods
  toParam() {
    return this.name.toLowerCase();
  },
}, {  // PointTypes static methods
  fromParam(param) {
    if (param === 'waterpoints') {
      return DataTypes.Waterpoints();
    } else if (param === 'boreholes') {
      return DataTypes.Boreholes();
    } else if (param === 'dams') {
      return DataTypes.Dams();
    } else {
      throw new Error(`Could not get DataTypes type for param '${param}'`);
    }
  },
});

export default DataTypes;
