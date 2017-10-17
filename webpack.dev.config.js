import path    from 'path';
import {config}  from './webpack.config';
import webpack from 'webpack';

config.devtool = 'source-map';
config.output.path = path.resolve(__dirname, './');
config.plugins = config.plugins.concat([new webpack.HotModuleReplacementPlugin()]);
config.entry.renderer = ['webpack-hot-middleware/client?reload=true'].concat(config.entry.renderer);

module.exports = config;