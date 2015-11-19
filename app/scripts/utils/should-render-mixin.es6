import * as reactAll from 'react';

const ShouldRenderMixin = {

  shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }
    var key;
    // Test for A's keys different from B.
    for (key in objA) {
      if (objA.hasOwnProperty(key) &&
          (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
        return false;
      }
    }
    // Test for B's keys missing from A.
    for (key in objB) {
      if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  },

  shouldComponentUpdate(nextProps, nextState) {
    debugger;
    const result = !this.shallowEqual(this.props, nextProps)
        || this.state !== nextState;
    return result;
  },
}

export default ShouldRenderMixin;
