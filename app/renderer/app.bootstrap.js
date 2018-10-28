import angular from 'angular';
import {AppModule} from './app.module';
import env from './app.constants';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

angular.module('eurvolpre', [AppModule, env.name]).run((ENV) => {
    'ngInject';
    process.env.NODE_ENV = ENV;
    console.log(ENV);
});
