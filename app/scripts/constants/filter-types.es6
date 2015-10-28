import { Union } from 'results';

const FilterTypes = Union({
  Range: {},
  Include: {},
  Exclude: {},
});

export default FilterTypes;
