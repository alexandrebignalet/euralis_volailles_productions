import angular from 'angular';
import {AppModule} from './app.module';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import initDabatase from './renderer';

angular.module('eurvolpre', [AppModule])
    .constant('init', initDabatase)
    .run((init) => {
        'ngInject';
        init();
    });
