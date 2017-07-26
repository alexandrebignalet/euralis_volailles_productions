var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: __dirname + '/app',
    entry: {
        app: './app/renderer.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel'},
            { test: /\.html$/, loader: 'raw' },
            { test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
            { test: /\.(scss|sass)$/, loader: 'style!css!sass' },
            { test: /\.(png|jpg|JPG|svg)/, loader: 'url-loader?limit=100000&name=images/[name].[ext]'  },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    output: {
        publicPath: './',
        path: path.resolve(__dirname, './electron'),
        filename: '[name].bundle.js'
    },
    target: 'electron-renderer',
    resolve: {
        alias: {
            '$': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
            'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, './app'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery', //in order to load it in angular
            '$': "jquery",
            'jQuery': "jquery"
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject: 'body',
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
