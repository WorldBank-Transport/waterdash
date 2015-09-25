import { Enum } from 'results';

const $ = {};  // just a place-holder for the object definitions

const state = Enum({
  Active: $,  // should constructed with a Date object
  Finished: $,  // should be constructed with a Date object
  Failed: $,  // shoudl be constructed with a Date object
});

export { state };
