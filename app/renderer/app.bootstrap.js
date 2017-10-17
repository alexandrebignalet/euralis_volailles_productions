import angular from 'angular';
import {AppModule} from './app.module';
import env from './app.constants';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

angular.module('eurvolpre', [AppModule, env.name]).run((ENV) => {
    'ngInject';
    process.env.NODE_ENV = ENV;
    console.log(ENV);
});
