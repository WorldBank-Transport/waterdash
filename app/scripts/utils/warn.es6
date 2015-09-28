/* eslint no-console: 0 */
/**
 * Wrap console warnings in a test-safe mockable function
 * @returns {undefined}
 */
const warn = (...args) => console.warn(...args);
export default warn;
