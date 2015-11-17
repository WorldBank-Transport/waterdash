import isUndefined from 'lodash/lang/isUndefined';
import isNumber from 'lodash/lang/isNumber';
import isNaN from 'lodash/lang/isNaN';

export const getNumberOr0 = (value) => {
  return (!isUndefined(value) && isNumber(value) && !isNaN(value)) ? value : 0;
};
