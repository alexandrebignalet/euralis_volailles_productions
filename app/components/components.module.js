import angular from 'angular';
import toastr from 'toastr';
import 'toastr/toastr.scss';

import {HomeModule} from './home/home.module';
import {NavbarModule} from './navbar/navbar.module';
import {PresentationModule} from './presentation/presentation.module';
import {ManagementModule} from './management/management.module';
import {ModalService} from '../service/modal.service';
import {SidebarModule} from './sidebar/sidebar.module';
import {InvestmentModule} from './management/investment/investment.module';
import {FileUploaderModule} from './file_uploader/file_uploader.module';
import {SyncDialogComponent} from './sync/sync-dialog.component';

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

export const ComponentsModule = angular.module('ComponentsModule', [
    SidebarModule,
    HomeModule,
    PresentationModule,
    NavbarModule,
    ManagementModule,
    InvestmentModule,
    FileUploaderModule
])
    .config(($stateProvider, $locationProvider) => {
        'ngInject';

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('components', {
                parent: 'app',
                abstract: true,
                views: {
                    'sidebar@': {
                        template:'<sidebar></sidebar>'
                    }
                }
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
    .service('ModalService', ModalService)
    .component('syncDialog', SyncDialogComponent)
    .constant('toastr', toastr)
    .name;
