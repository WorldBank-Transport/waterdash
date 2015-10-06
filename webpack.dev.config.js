const path = require('path');
const webpack = require('webpack');


const stylesLoader = {
  test: /\.scss$/,
  loaders: ['style', 'css?sourceMap', 'sass?sourceMap' ],
  include: path.join(__dirname, 'app', 'stylesheets'),
};

module.exports = {
  __stylesLoader: stylesLoader,  // ref for webpack.config.js
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
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loaders: ['react-hot', 'babel'],
        include: [
          path.join(__dirname, 'node_modules', 'react-leaflet'),
          path.join(__dirname, 'app', 'scripts'),
        ],
        exclude: /node_modules\/(?!react-leaflet)/,
      },
      stylesLoader,
    ],
  },
  resolve: {
    alias: {
      stylesheets: path.resolve(__dirname, 'app', 'stylesheets'),
    },
    extensions: ['', '.es6', '.js', '.jsx', '.scss'],
  },
};
