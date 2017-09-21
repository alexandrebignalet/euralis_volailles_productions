import angular from 'angular';
import {AppModule} from './app.module';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import {init} from './renderer';
import env from './app.constants';

angular.module('eurvolpre', [env.name, AppModule]).run((ENV) => { 'ngInject'; init(ENV);});
