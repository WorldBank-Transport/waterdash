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
