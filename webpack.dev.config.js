import webpack from 'webpack';
import path    from 'path';
import {config}  from './webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

config.output = {
  filename: '[name].js',
  publicPath: '',
  path: path.resolve(__dirname, './.tmp')
};

config.entry = {
    renderer: [
        'babel-polyfill',
        path.join(__dirname, 'app/renderer/app.bootstrap.js')
    ],
    main: [
        path.join(__dirname, 'app/main/main.js')
    ]
};

config.resolve.alias = {
    '$': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
    'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
};

config.plugins = config.plugins.concat([
    new webpack.ProvidePlugin({
        'window.jQuery': 'jquery', //in order to load it in angular
        '$': "jquery",
        'jQuery': "jquery"
    }),

    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
        template: './app/index.html',
        inject: false,
        hash: true
    })
]);

config.target = 'electron';


export default config;