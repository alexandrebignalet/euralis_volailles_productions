'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import gutil    from 'gulp-util';
import mocha    from 'gulp-mocha';
import browserSync from 'browser-sync';
import del      from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';
import karma from 'karma';
import rename from 'gulp-rename';
import ngConstant from 'gulp-ng-constant';

const config = {
    app: 'app/',
    constantTemplate:
    'angular.module(\'<%- moduleName %>\', [])' +
    '<% constants.forEach(function(constant) { %>.constant(\'<%- constant.name %>\', <%= constant.value %>)\n<% }) %>;\n' +
    '    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n'
};

let root = './';

// map of all paths
let paths = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.bootstrap.js')
  ],
  output: root,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

gulp.task('ngconstant:dev',  () => {
    return ngConstant({
        name: 'EnvModule',
        constants: {
            ENV: 'dev'
        },
        template: config.constantTemplate,
        stream: true
    })
        .pipe(rename('app.constants.js'))
        .pipe(gulp.dest(config.app));
});

gulp.task('ngconstant:test',  () => {
    return ngConstant({
        name: 'EnvModule',
        constants: {
            ENV: 'test'
        },
        template: config.constantTemplate,
        stream: true
    })
        .pipe(rename('app.constants.js'))
        .pipe(gulp.dest(config.app));
});

gulp.task('ngconstant:prod', () => {
    return ngConstant({
        name: 'EnvModule',
        constants: {
            ENV: 'prod'
        },
        template: config.constantTemplate,
        stream: true
    })
        .pipe(rename('app.constants.js'))
        .pipe(gulp.dest(config.app));
});

gulp.task('webpack', ['clean'], (cb) => {

  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('serve', ['ngconstant:dev'], () => {

  const config = require('./webpack.dev.config');
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
  ].concat(paths.entry);

  var compiler = webpack(config);

  browserSync({
    port: process.env.PORT || 3000,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ]
  });

    gulp.watch(['./app/**/*.spec.js'], ['karma', 'test']);
});

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  })
});

const Server = karma.Server;

gulp.task('karma', ['ngconstant:test'],(done) => {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    },  () => {
        done();
    }).start();
});

gulp.task('test', ['karma', 'ngconstant:test'], () => {

    process.env.NODE_ENV = 'test';

    return gulp.src(['test/database/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('default', ['serve']);
