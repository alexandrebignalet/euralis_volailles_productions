import angular from 'angular';
import 'angular-i18n/angular-locale_fr-fr';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import {ComponentsModule} from './components/components.module';
import {StateHandler} from './service/state.handler';

import {AppComponent} from './app.component';
import './renderer';

export const AppModule = angular.module('AppModule', [
    uiRouter,
    uiBootstrap,
    ComponentsModule
])
    .config(($locationProvider, $stateProvider, $urlRouterProvider, $sceProvider) => {
        'ngInject';

        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
            .state('app', {
                abstract: true
            });

        $urlRouterProvider.otherwise('/home');
        $sceProvider.enabled(false);
    })
    .service('StateHandler', StateHandler)
    .component('app', AppComponent)
    .constant('VERSION', 'V1')
    .name;
