import CleanWebpackPlugin from 'clean-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import {config} from './webpack.config';

config.entry.main = [
    path.join(__dirname, 'app/main/main.js')
];
config.output.path = path.resolve(__dirname, 'build/electron/');
config.output.publicPath = '';
config.target = 'electron';

config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'angular']
        }
    }),
    new CleanWebpackPlugin(['./build/electron'])
]);

module.exports = config;