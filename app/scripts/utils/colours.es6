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
    color = '#82c675';
    break;
  case 'NON FUNCTIONAL':
    color = '#f05e55';
    break;
  case 'NON FUNCTIONAL < 3M':
    color = '#f05e55';
    break;
  case 'NON FUNCTIONAL > 3M':
    color = '#f05e55';
    break;
  case 'NON FUNCTIONAL < 6M':
    color = '#f05e55';
    break;
  case 'NON FUNCTIONAL > 6M':
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
