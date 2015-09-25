module.exports = {
  process: function(src, filename) {
    return require('babel-jest').process(src, filename)
      .replace(/^require\('stylesheets\/.*;$/gm, '');
  },
};
