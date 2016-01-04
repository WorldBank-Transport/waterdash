import isUndefined from 'lodash/lang/isUndefined';

/**
 * Duplicates the good, medium, poor colour variables from scss styles, since
 * sometimes we need them in javascript.
 */
const colours = {
  bgColor: '#ffffff',
  textColor: '#555555',
  theme: '#05a2dc',

  // Scale colours
  many: '#3f7086',  // TODO: I picked these from the polygons mockup
  few: '#4cafd8',  // ... but we probably need more colours

  // Ranking colours
  good: '#82c675',
  medium: '#fbc030',
  poor: '#f05e55',

  unknown: '#7d7d7d',
};
export default colours;


export const polygon = {  // sync with edudash: https://github.com/WorldBank-Transport/edudash/blob/edudash-2.0/app/scripts/services/colors.coffee
  normal: colour => {
    const style = {
      fillColor: colour,
      fillOpacity: 0.75,
      opacity: 0.6,
      weight: 2,
    };
    if (!isUndefined(colour)) {
      style.color = colour;
    }
    return style;
  },
  hovered: {
    color: colours.bgColor,
    fillOpacity: 0.9,
    // fillColor is kept from normal
    opacity: 1,
    weight: 6,
  },
  selected: {
    // TODO
  },
};


export const Color = {};

Color.getWaterpointColor = (status) => {
  let color = null;
  switch (status) {
  case 'FUNCTIONAL':
    color = '#82c675';
    break;
  case 'NON FUNCTIONAL':
  case 'NON FUNCTIONAL < 3M':
  case 'NON FUNCTIONAL > 3M':
  case 'NON FUNCTIONAL < 6M':
  case 'NON FUNCTIONAL > 6M':  // TODO: consider checking if string starts with NON FUNCTIONAL instead of the switch/case fall-through
    color = '#f05e55';
    break;
  case 'FUNCTIONAL NEEDS REPAIR':
    color = '#fbc030';
    break;
  default:
    throw Error(`there is not state found, actual: ${status}`);
  }
  return color;
};

Color.getDamsColor = (metric) => {
  let color = null;
  switch (metric) {
  case 'DAM_HEIGHT':
    color = '#94daf7';
    break;
  case 'ELEVATION_':
    color = '#4cafd8';
    break;
  case 'RESERVOIR_':
    color = '#3f7086';
    break;
  default:
    throw Error(`there is no metric found, actual: ${metric}`);
  }
  return color;
};

Color.getBoreholesColor = (metric) => {
  let color = null;
  switch (metric) {
  case 'DIAMETER':
    color = '#FA8072';
    break;
  case 'DEPTH_METER':
    color = '#FF4500';
    break;
  case 'STATIC_WATER_LEVEL':
    color = '#87CEEB';
    break;
  case 'DYNAMIC_WATER_LEVEL_METER':
    color = '#DDA0DD';
    break;
  case 'DRAW _DOWN_METER':
    color = '#000080';
    break;
  case 'YIELD_METER_CUBED_PER_HOUR':
    color = '#4B0082';
    break;
  default:
    throw Error(`there is no metric found, actual: ${metric}`);
  }
  return color;
};

Color.WATER_QUALITY = {
  COLOURED: '#fff7fb',
  FLUORIDE: '#8cd1ed',
  'FLUORIDE ABANDONED': '#d0d1e6',
  GOOD: '#a6bddb',
  MILKY: '#74a9cf',
  SALTY: '#1da3da',
  'SALTY ABANDONED': '#3690c0',
  SOFT: '#b5d3df',
  UNKNOWN: '#cccccc',
};

Color.WATER_QUANTITY = {
  DRY: '#d8e2e6',
  ENOUGH: '#b5d3df',
  INSUFFICIENT: '#1da3da',
  OTHER: '#74a9cf',
  SEASONAL: '#2b8cbe',
  UNKNOWN: '#cccccc',
};


Color.SOURCE_TYPE = {
  DAM: '#cfdde4',
  'HAND DTW': '#a0a7a9',
  LAKE: '#1f597a',
  'MACHINE DBH': '#bde6fa',
  'MACHINE-DRILLED BOREHOLE': '#d0d1e6',
  OTHER: '#a6bddb',
  'RAINWATER HARVESTING': '#74a9cf',
  RIVER: '#d6e9f5',
  'SHALLOW WELL': '#1da3da',
  SPRING: '#0e7aaf',
  UNKNOWN: '#cccccc',
};
