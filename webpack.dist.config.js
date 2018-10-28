import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';
import {config} from './webpack.config';

config.entry.main = [
    path.join(__dirname, 'app/main/main.js')
];
config.mode = 'production';
config.output.path = path.resolve(__dirname, 'build/electron/');
config.output.publicPath = '';
config.target = 'electron';

config.plugins = config.plugins.concat([new CleanWebpackPlugin(['./build/electron'])]);

module.exports = config;