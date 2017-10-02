'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import colorsSupported      from 'supports-color';
import karma from 'karma';
import gulpLoadPlugins from 'gulp-load-plugins';
import electronCo from 'electron-connect';
import {argv} from 'yargs';

const electronConnect = electronCo.server.create();
const $ = gulpLoadPlugins();



const config = {
    app: 'app/renderer',
    tmp: '.tmp',
    dist: 'build/electron',
    constantTemplate:
    'angular.module(\'<%- moduleName %>\', [])' +
    '<% constants.forEach(function(constant) { %>.constant(\'<%- constant.name %>\', <%= constant.value %>)\n<% }) %>;\n' +
    '    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n'
};

const Server = karma.Server;

gulp.task('karma', (done) => {

    new Server({
        configFile: __dirname + '/karma.conf.js'
    },  () => {
        done();
    }).start();
});

gulp.task('test', ['karma'], () => {

    process.env.NODE_ENV = 'test';

    return gulp.src(['test/database/**/*.js'], { read: false })
        .pipe($.mocha({ reporter: 'spec' }))
        .on('error', $.util.log);
});

gulp.task('webpack', ['compile'], () => process.env.NODE_ENV = 'prod');

gulp.task('electron-dev', ['compile'], () => {
    process.env.NODE_ENV = 'dev';
    electronConnect.start();

    gulp.watch(['app/**/*.*'], () => {
        gulp.start('compile', electronConnect.restart);
    });
});

gulp.task('compile', () => {
    let config = !argv.prod ? require('./webpack.dev.config') : require('./webpack.dist.config');

    return new Promise((resolve) => {
        webpack(config, (err, stats) => { webpackThen(err,stats); resolve();});
    });
});


function webpackThen(err, stats) {
    if (err) {
        throw new $.util.PluginError("webpack", err);
    }

    $.util.log("[webpack]", stats.toString({
        colors: colorsSupported,
        chunks: false,
        errorDetails: true
    }));
}

gulp.task('default', ['serve']);
