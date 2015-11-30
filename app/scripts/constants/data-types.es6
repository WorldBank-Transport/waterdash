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
  getLocationProp(viewMode) {
    return DataTypes.match(this, {
      Waterpoints: () => ViewModes.match(viewMode, {
        Points: () => Some('position'),  // pulled into this prop by pullLatLng in api module
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        Wards: () => Some('WARD'),
      }),
      Boreholes: () => ViewModes.match(viewMode, {
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        [_]: () => None(),
      }),
      Dams: () => ViewModes.match(viewMode, {
        Points: () => Some('position'),  // from pullLatLng in api module
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        [_]: () => None(),
      }),
    });
  },
  getIdColumn() {
    return DataTypes.match(this, {
      Waterpoints: () => 'WATER_POINT_CODE',
      Boreholes: () => '_id',  // TODO: _id is generated from ckan. need a stable, unique id for all boreholes.
      Dams: () => 'POINT_ID',
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
