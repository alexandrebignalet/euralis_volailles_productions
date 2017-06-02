var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {},
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
  resolve: {
    alias: {
      '$': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
      'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
    }
  },
  externals: [
      'leveldown',
      'sqlite3'// <- Add here
  ],
  plugins: [
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
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
