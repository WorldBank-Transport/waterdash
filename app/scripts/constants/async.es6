import { Union } from 'results';

const Async = Union({
  Active: {},  // should constructed with a Date object
  Finished: {},  // should be constructed with a Date object
  Failed: {},  // shoudl be constructed with a Date object
});

export default Async;
