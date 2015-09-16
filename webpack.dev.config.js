var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/scripts/app.es6'
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
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
      }
    ]
  }
};
