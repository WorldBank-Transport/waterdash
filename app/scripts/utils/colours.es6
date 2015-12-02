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
    color: colours.theme,
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
  FLUORIDE: '#ece7f2',
  'FLUORIDE ABANDONED': '#d0d1e6',
  GOOD: '#a6bddb',
  MILKY: '#74a9cf',
  SALTY: '#3690c0',
  'SALTY ABANDONED': '#0570b0',
  SOFT: '#045a8d',
  UNKNOWN: '#023858',
};

Color.WATER_QUANTITY = {
  DRY: '#f1eef6',
  ENOUGH: '#d0d1e6',
  INSUFFICIENT: '#a6bddb',
  OTHER: '#74a9cf',
  SEASONAL: '#2b8cbe',
  UNKNOWN: '#045a8d',
};


Color.SOURCE_TYPE = {
  DAM: '#67001f',
  'HAND DTW': '#b2182b',
  LAKE: '#d6604d',
  'MACHINE DBH': '#f4a582',
  'MACHINE-DRILLED BOREHOLE': '#fddbc7',
  OTHER: '#f7f7f7',
  'RAINWATER HARVESTING': '#d1e5f0',
  RIVER: '#92c5de',
  'SHALLOW WELL': '#4393c3',
  SPRING: '#2166ac',
  UNKNOWN: '#053061',
};
