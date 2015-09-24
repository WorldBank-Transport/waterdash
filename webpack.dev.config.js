const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/scripts/app.jsx',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loaders: ['react-hot', 'babel'],
        include: [
          path.join(__dirname, 'app', 'scripts'),
          path.join(__dirname, 'node_modules', 'react-leaflet'),
        ],
        exclude: /node_modules\/(?!react-leaflet)/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' +
          'sass?sourceMap'
        ),
        include: path.join(__dirname, 'app', 'stylesheets'),
      },
    ],
  },
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'app', 'scripts', 'actions'),
      components: path.resolve(__dirname, 'app', 'scripts', 'components'),
      scripts: path.resolve(__dirname, 'app', 'scripts'),
      stores: path.resolve(__dirname, 'app', 'scripts', 'stores'),
      stylesheets: path.resolve(__dirname, 'app', 'stylesheets'),
      'react-leaflet': path.resolve(__dirname, 'node_modules', 'react-leaflet', 'src'),
      utils: path.resolve(__dirname, 'app', 'scripts', 'utils'),
    },
    extensions: ['', '.es6', '.js', '.jsx', '.scss'],
  },
};
