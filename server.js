var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
  contentBase: __dirname + '/app',
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
}).listen(3000, 'localhost', function (err, result) {
  if (err != null) {
    console.error(err);
  } else {
    console.log('Listening at localhost:3000');
  }
});
