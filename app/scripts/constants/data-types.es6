import { Union } from 'results';

const DataTypes = Union({
  Waterpoints: {},
  Boreholes: {},
  Dams: {},
}, {
  // DataTypes instance methods
  equals(other) {
    if (!(other instanceof DataTypes.OptionClass)) {
      return false;
    } else {
      return other.name === this.name;
    }
  },
  toParam() {
    return DataTypes.match(this, {
      Waterpoints: () => 'waterpoints',
      Boreholes: () => 'boreholes',
      Dams: () => 'dams',
    });
  },
}, {
  // DataTypes static methods
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
