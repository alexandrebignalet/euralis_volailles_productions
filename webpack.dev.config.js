const path    = require('path');
const createBaseConfig = require('./webpack.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (env = {}) {
  const devConfig = createBaseConfig(env);
  devConfig.mode = "development";
  devConfig.devtool = "source-map";
  devConfig.output.path = path.resolve(__dirname, 'dev');

  if (env.bundleAnalyzer) {
    devConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  if (env.devServer) {
    devConfig.devServer = {
      contentBase: './dev'
    };
  }

  return devConfig;
};
