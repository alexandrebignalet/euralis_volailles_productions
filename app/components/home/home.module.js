import angular from 'angular';
import angularInview from 'angular-inview';
import {HomeComponent} from './home.component';

export const HomeModule = angular.module('HomeModule', [angularInview.name])

    .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
        'ngInject';

        $stateProvider
            .state('home', {
                parent: 'components',
                url: '/home',
                resolve: {
                  videos: (VideoDataService) => VideoDataService.all()
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
