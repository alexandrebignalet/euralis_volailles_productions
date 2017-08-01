import angular from 'angular';
import 'angular-i18n/angular-locale_fr-fr';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'ngstorage';

import {ComponentsModule} from './components/components.module';
import {StateHandler} from './service/state.handler';
import {UserService} from './service/user.service';

import {AppComponent} from './app.component';
import './renderer';

export const AppModule = angular.module('AppModule', [
    'ngStorage',
    uiRouter,
    uiBootstrap,
    ComponentsModule
])
    .config(($locationProvider, $stateProvider, $urlRouterProvider, $sceProvider, $localStorageProvider, localStoragePrefix) => {
        'ngInject';

        $localStorageProvider.setKeyPrefix(localStoragePrefix);
        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
            .state('app', {
                abstract: true
            });

        $urlRouterProvider.otherwise('/home');
        $sceProvider.enabled(false);
    })
    .service('StateHandler', StateHandler)
    .service('UserService', UserService)
    .component('app', AppComponent)
    .constant('VERSION', 'V1')
    .constant('localStoragePrefix', 'eurvolpre-')
    .name;
