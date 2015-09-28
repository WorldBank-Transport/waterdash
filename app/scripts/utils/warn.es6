/* eslint no-console: 0 */
/**
 * Wrap console warnings in a test-safe mockable function
 * @returns {undefined}
 */
const warn = (...args) => console.error(...args);
export default warn;
