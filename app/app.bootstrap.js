import angular from 'angular';
import {AppModule} from './app.module';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '../electron/renderer';

angular.module('eurvolpre', [AppModule]);
