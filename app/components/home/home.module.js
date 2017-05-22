import angular from 'angular';

import {HomeComponent} from './home.component';
import {aquitaineMap} from './home.directive';
import {department} from './home.directive';

export const HomeModule = angular.module('HomeModule', [])

    .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
        'ngInject';

        $stateProvider
            .state('home', {
                parent: 'components',
                url: '/home',
                views: {
                    'content@': {
                        template: '<home></home>',
                    }
                }
            });

        $urlRouterProvider.otherwise('/home');
    })
    .component('home', HomeComponent)
    .directive('aquitaineMap', aquitaineMap)
    .directive('department', department)
    .constant('VERSION', 'V1')
    .name;
