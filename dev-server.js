const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const createDevConfig = require('./webpack.dev.config');
const devConfig = createDevConfig({ devServer: true });

new WebpackDevServer(webpack(devConfig), {
  publicPath: devConfig.output.publicPath,
  historyApiFallback: true,
  open: true
}).listen(8080, 'localhost', function(err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening localhost:8080');
});
