import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import nodeExternal from 'webpack-node-externals';

const externals = {node: nodeExternal()}, _externals = [
    'sqlite3', 'leveldown'
];

_externals.forEach((s) => {
    externals[s] = 'commonjs ' + s;
});


export let config = {
    entry: {
        renderer: [
            'babel-polyfill',
            path.join(__dirname, 'app/renderer/app.bootstrap.js')
        ]
    },
    module: {
    loaders: [
        { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel'},
        { test: /\.(html|txt)$/, loader: 'raw' },
        { test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
        { test: /\.(scss|sass)$/, loader: 'style!css?url=false!sass' },
        { test: /\.(png|jpg|JPG|svg|mp4|gif)/, loader: 'url-loader?limit=100000&name=images/[name].[ext]'  },
        { test: /\.css$/, loader: 'style!css?url=false' },
        { test: /\.json$/, loader: 'json-loader' }
    ]
    },
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        alias: {
            '$': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
            'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
        }
    },
    externals: externals,
    plugins: [
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery', //in order to load it in angular
            '$': "jquery",
            'jQuery': "jquery"
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject: false,
            hash: true
        })
    ]
};
