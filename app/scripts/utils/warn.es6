/**
 * Wrap console warnings in a test-safe mockable function
 */
const warn = (...args) => console.warn(...args);
export default warn;
