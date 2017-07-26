module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'mocha', 'chai', 'sinon'],

    // list of files/patterns to load in the browser
    files: ['app/**/*.spec.js'],

    // files to exclude
    exclude: [],

    plugins: [
      require("karma-chai"),
      require("karma-sinon"),
      require("karma-chrome-launcher"),
      require("karma-mocha"),
      require("karma-jasmine"),
      require("karma-mocha-reporter"),
      require("karma-sourcemap-loader"),
      require("karma-webpack")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { 'app/**/*.spec.js': ['webpack'] },

    webpack: {
      devtool: 'inline-source-map',
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
      }
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // com.euralis_volailles_productions.web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: true
  });
};
