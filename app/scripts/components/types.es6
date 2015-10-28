import { PropTypes } from 'react';

export const translatable = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    k: PropTypes.string.isRequired,
    i: PropTypes.array,
  }),
]);
