import angular from 'angular';
import {ManagementComponent} from './management.component';
import {ProductionFormComponent} from './production_form.component';
import {ManagementService} from './management.service';
import './management.scss';

export const ManagementModule = angular
    .module('Management', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $stateProvider
            .state('management', {
                parent: 'components',
                url: '/productions',
                resolve: {
                    productions: AppDataService => AppDataService.getProductions()
                },
                views: {
                    'content@': {
                        template: '<management productions="$resolve.productions"></management>',
                    }
                }
            })
            .state('management.create', {
                parent: 'management',
                url: '/create',
                onEnter: ManagementService => ManagementService.open('productionForm', {})
            })
            .state('management.edit', {
                parent: 'management',
                url: '/:id/edit',
                onEnter: (ManagementService, AppDataService, $stateParams) => {
                    'ngInject';
                    ManagementService.open('productionForm', AppDataService.get($stateParams.id));
                }
            })
            .state('management.remove', {
                parent: 'management',
                url: '/:id/remove',
                onEnter: (ManagementService, AppDataService, $stateParams) => {
                    'ngInject';
                    ManagementService.open('productionForm', AppDataService.get($stateParams.id));
                }
            });
    })
    .component('management', ManagementComponent)
    .component('productionForm', ProductionFormComponent)
    .service('ManagementService', ManagementService)
    .name;