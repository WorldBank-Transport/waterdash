import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { state } from '../constants/async';
const { Finished, Active, Failed } = state;


/**
 * @param {object} actions The async actions this store will listen to
 * @returns {object} a store
 */
function createAsyncStateStore({start, end, fail}) {
  return createStore({
    initialData: Finished({t: new Date()}),
    mixins: [SaneStore],
    init() {
      this.listenTo(start, 'start');
      this.listenTo(end, 'end');
      this.listenTo(fail, 'fail');
    },
    start() {
      this.setData(Active({t: new Date()}));
    },
    end() {
      this.setData(Finished({t: new Date()}));
    },
    fail([errKey, ...errInterp]) {
      this.setData(Failed({
        t: new Date(),
        errKey,
        errInterp,
      }));
    },
  });
}

export default createAsyncStateStore;
