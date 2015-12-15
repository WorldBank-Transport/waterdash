import DataTypes from '../constants/data-types';
import * as func from './functional';


export const getSearchField = (type) => {
  return DataTypes.match(type, {
    Waterpoints: () => ['WATER_POINT_CODE', 'WATER_POINT_NAME', 'REGION', 'DISTRICT', 'WARD'],
    Boreholes: () => ['BOREHOLE_NO', 'REGION', 'DISTRICT'],
    Dams: () => ['DAM_NAME', 'BASIN', 'REGION', 'DISTRICT'],
  });
};

export const getSearchItems = (data, field) => {
  let values = [];
  switch (field) {
  case 'WATER_POINT_CODE':
  case 'WATER_POINT_NAME':
  case 'BOREHOLE_NO':
  case 'DAM_NAME':
    values = data;
    break;
  case 'REGION':
  case 'DISTRICT':
  case 'WARD':
  case 'BASIN':
    values = Object.keys(func.Result.countBy(data, field))
                  .filter(key => key !== 'total')
                  .map(key => {
                    return {
                      [field]: key,
                    };
                  });
    break;
  }
  return values;
};

export const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default',
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default',
  },

  menu: {
    border: 'solid 1px #ccc',
  },
};
