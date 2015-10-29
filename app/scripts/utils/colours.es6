/**
 * Duplicates the good, medium, poor colour variables from scss styles, since
 * sometimes we need them in javascript.
 */
export default {
  bgColor: '#ffffff',
  textColor: '#555555',
  good: '#82c675',
  medium: '#fbc030',
  poor: '#f05e55',
  unknown: '#7d7d7d',
};

export const Color = {};

Color.getWaterpointColor = (status) => {
  let color = null;
  switch (status) {
  case 'FUNCTIONAL':
    color = 'green';
    break;
  case 'NON FUNCTIONAL':
  case 'NON FUNCTIONAL < 3M':
  case 'NON FUNCTIONAL > 3M':
  case 'NON FUNCTIONAL < 6M':
  case 'NON FUNCTIONAL > 6M':  // TODO: consider checking if string starts with NON FUNCTIONAL instead of the switch/case fall-through
    color = 'red';
    break;
  case 'FUNCTIONAL NEEDS REPAIR':
    color = 'yellow';
    break;
  default:
    throw Error(`there is not state found, actual: ${status}`);
  }
  return color;
};
