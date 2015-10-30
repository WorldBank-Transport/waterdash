import { Union, _ } from 'results';


const Async = Union({
  Active: {},  // should constructed with a Date object
  Finished: {},  // should be constructed with a Date object
  Failed: {},  // shoudl be constructed with a Date object
}, {
  /**
   * Using the order (Failed, Active, Finished), return the lowest of this and
   * other.
   * @param {Async} other The other async to compare
   * @returns {Async} The lowest of this and other
   */
  and(other) {
    return Async.match(this, {
      Finished: () => other,  // other must be equal or lower
      Active: () => Async.match(other, {
        Failed: () => other,  // active > failed
        [_]: () => this,  // active <= (active, finished)
      }),
      Failed: () => this,  // failed <= (any state of other)
    });
  },
});


export default Async;
