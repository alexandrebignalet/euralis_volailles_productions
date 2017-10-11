import angular from 'angular';
import angularInview from 'angular-inview';
import {HomeComponent} from './home.component';

export const HomeModule = angular.module('HomeModule', [angularInview.name])

    .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
        'ngInject';
console.log("coucou home module");
        $stateProvider
            .state('home', {
                parent: 'components',
                url: '/home',
                resolve: {
                  videos: (PouchDbService) => PouchDbService.find('video')
                },
                views: {
                    'content@': {
                        template: '<home videos="$resolve.videos"></home>',
                    }
                }
            });

        $urlRouterProvider.otherwise('/home');
    })
    .component('home', HomeComponent)
    .constant('VERSION', 'V1')
    .name;
