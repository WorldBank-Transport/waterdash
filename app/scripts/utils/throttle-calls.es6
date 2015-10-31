import throttle from 'lodash/function/throttle';

const THROTTLE_PERIOD = 1000 / 3;  // 1/3 sec

const throttleCalls = fn => throttle(fn, THROTTLE_PERIOD, {
  leading: true,  // let the first one through
  trailing: true,  // make sure the last call is applied
});

export default throttleCalls;
