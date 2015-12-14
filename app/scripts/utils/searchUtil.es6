import DataTypes from '../constants/data-types';


export const getSearchField = (type) => {
  return DataTypes.match(type, {
    Waterpoints: () => ['WATER_POINT_CODE', 'WATER_POINT_NAME', 'REGION', 'DISTRICT', 'WARD', ],
    Boreholes: () => ['BOREHOLE_NO', 'REGION', 'DISTRICT', ],
    Dams: () => ['DAM_NAME', 'BASIN', 'REGION', 'DISTRICT', ],
  });
};
