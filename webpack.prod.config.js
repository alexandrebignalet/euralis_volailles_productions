const path = require('path');
const createBaseConfig = require('./webpack.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function (env = {}) {
  const prodConfig = createBaseConfig();
  prodConfig.mode = 'production';
  prodConfig.output.path = path.resolve(__dirname, 'build/web/');
  prodConfig.output.publicPath = '/';

  if (env.bundleAnalyzer) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  return prodConfig;
};

