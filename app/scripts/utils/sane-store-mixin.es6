/**
 * Follow store conventions: https://gist.github.com/uniphil/d8bf9b2691cab4c8551f
 */

const SaneStore = {
  /**
   * Update the value of the store
   *
   * May be called by:
   *  * external code: no.
   *  * local code: yes.
   *
   * A DG convention method, used to update the store's
   * `setData` must be exclusively used to update `data`
   * (except in `init`, the only other place it is allowed
   * to write directly to `data`)
   * This method should probably never do processing on
   * `newData`; this implementation should be sufficient.
   *
   * @param {*} newData Replaces the store's data
   * @returns {undefined}
   */
  setData: function(newData) {
    this.data = newData;
    this.emit();
  },

  /**
   * Retrieve a clean, consumer-ready representation of
   * the store's value
   *
   * May be called by:
   *  * external code: yes (but prefer `listen`).
   *  * local code: yes.
   *
   * Processing is allowed but not preferred.
   * External users are allowed to call `get` directly,
   * but are strongly recommended to listen to the store
   * for changes and initial state instead.
   *
   * @returns {*} Presentable view of the store's data
   */
  get: function() {
    return this.data;
  },

  /**
   * Notify listeners of updated store value
   *
   * May be called by:
   *  * external code: no.
   *  * local code: yes (but rarely needed).
   *
   * It is not usually necessary to call `emit`, since
   * calling `setData` will cause `emit` to be called
   * automatically. However, it is allowed.
   * Emit should not change the value of `this.get()`.
   * This implementation should be sufficient.
   *
   * @returns {undefined}
   */
  emit: function() {
    this.trigger(this.get());
  },

  /**
   * Retrieve the current state of the store.
   *
   * May be called by:
   *  * external code: yes.
   *  * local code: no.
   * (this method is part of the eventEmitter API)
   *
   * This implementation should be sufficient.
   *
   * @returns {*} The current presentable view of the store's data
   */
  getInitialState: function() {
    return this.get();
  },
};

export default SaneStore;
