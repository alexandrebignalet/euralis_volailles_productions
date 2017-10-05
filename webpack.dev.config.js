import CleanWebpackPlugin from 'clean-webpack-plugin';
import path    from 'path';
import {config}  from './webpack.config';

config.devtool = 'source-map';
config.output.path = path.resolve(__dirname, './.tmp');
config.plugins = config.plugins.concat([new CleanWebpackPlugin(['./.tmp'])]);

module.exports = config;