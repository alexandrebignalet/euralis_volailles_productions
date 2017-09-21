import CleanWebpackPlugin from 'clean-webpack-plugin';

const externals = {}, _externals = [
    'sqlite3', 'leveldown'
];

_externals.forEach(function(s) {
    externals[s] = 'commonjs ' + s;
});

export let config = {
    devtool: 'source-map',
    entry: {},
    module: {
    loaders: [
        { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel'},
        { test: /\.(html|txt)$/, loader: 'raw' },
        { test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
        { test: /\.(scss|sass)$/, loader: 'style!css!sass' },
        { test: /\.(png|jpg|JPG|svg|mp4|gif)/, loader: 'url-loader?limit=100000&name=images/[name].[ext]'  },
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.json$/, loader: 'json-loader' }
    ]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {},
    externals: externals,
    plugins: [
        new CleanWebpackPlugin(['./.tmp'])
    ]
};
