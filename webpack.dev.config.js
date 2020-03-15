import path    from 'path';
import {config}  from './webpack.config';
import webpack from 'webpack';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.devtool = 'source-map';
config.output.path = path.resolve(__dirname, './');
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin()
]);
config.entry.renderer = ['webpack-hot-middleware/client?reload=true'].concat(config.entry.renderer);

module.exports = config;
