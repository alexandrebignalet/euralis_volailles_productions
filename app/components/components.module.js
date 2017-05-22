import angular from 'angular';

import {HomeModule} from './home/home.module';
import {NavbarModule} from './navbar/navbar.module';
import {PresentationModule} from './presentation/presentation.module';
import {ManagementModule} from './management/management.module';

export const ComponentsModule = angular.module('ComponentsModule', [
    HomeModule,
    PresentationModule,
    NavbarModule,
    ManagementModule
])
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('components', {
                parent: 'app',
                abstract: true
            });
    })
    .run(($rootScope) => {
        'ngInject';
        // DEBUG RESOLVE $state
        // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        //   console.log('$stateChangeStart to '+toState.name+'- fired when the transition begins. toState,toParams :' +
        //       ' \n',toState, toParams);
        // });
        // $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
        //   console.log('$stateChangeError - fired when an error occurs during transition.');
        //   console.log(arguments);
        // });
        // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        //   console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
        // });
        // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
        //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
        // });
        //
        // $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        //   console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        //   console.log(unfoundState, fromState, fromParams);
        // });
    })
    .name;
