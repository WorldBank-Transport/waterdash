const assign = require('object-assign');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.dev.config.js');

module.exports = assign({}, config, {
  entry: './app/scripts/app.jsx',
  output: { filename: 'dist/bundle.js' },
  devtool: null,
  plugins: [
    new ExtractTextPlugin('dist/style.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
});
