import { Union, Some, None, _ } from 'results';
import ViewModes from './view-modes';

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
  /**
   * Map column names for region, district, ward to each datatset
   * @param {Union<ViewModes>} viewMode the viewMode to lookup
   * @returns {Maybe} Either Some(columnName) or None if the dataset does not have it
   */
  getLocationColumn(viewMode) {
    return DataTypes.match(this, {
      Waterpoints: () => ViewModes.match(viewMode, {
        Points: () => Some(['LATITIUDE', 'LONGITUDE']),  // TODO: use this in pullLatLng
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        [_]: () => None(),
      }),
      Boreholes: () => ViewModes.match(viewMode, {
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        [_]: () => None(),
      }),
      Dams: () => ViewModes.match(viewMode, {
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        [_]: () => None(),
      }),
    });
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
