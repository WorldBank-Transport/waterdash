const assign = require('object-assign');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.dev.config');


delete config.__stylesLoader.loaders;
config.__stylesLoader.loader = ExtractTextPlugin.extract(
  'css?sourceMap!' +
  'sass?sourceMap'
);

module.exports = assign({}, config, {
  entry: './app/scripts/app.jsx',
  output: { filename: 'dist/bundle.js' },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('dist/style.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
});
