const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/scripts/app.jsx'
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      {
        test: /\.es6$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app'),
        exclude: /node_modules\//
      },
      {
        test: /\.jsx$/,
        loaders:['react-hot', 'babel'],
        include: path.join(__dirname, 'app'),
        exclude: /node_modules\//
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' +
          'sass?sourceMap'
        ),
        include: path.join(__dirname, 'app'),
        exclude: /node_modules\//
      }
    ]
  },
  resolve: {
    alias: {
      stylesheets: path.resolve(__dirname, 'app', 'stylesheets')
    }
  }
};
