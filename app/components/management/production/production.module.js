import angular from 'angular';
import {ProductionFormComponent} from './production_form.component';
import {ProductionComponent} from './production.component';
import {ProductionDataService} from './production.service';
import './production.scss';

export const ProductionModule = angular
    .module('Production', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $stateProvider
            .state('production', {
                parent: 'management',
                url: '/productions',
                resolve: {
                    productions: ProductionDataService => ProductionDataService.all()
                },
                views: {
                    'content@': {
                        template: '<productions productions="$resolve.productions"></productions>',
                    }
                }
            })
            .state('production.create', {
                parent: 'production',
                url: '/create',
                onEnter: ModalService => ModalService.open('productionForm', {
                    production: {},
                    facilities: FacilityDataService => FacilityDataService.all()
                })
            })
            .state('production.edit', {
                parent: 'production',
                url: '/:id/edit',
                onEnter: (ModalService, ProductionDataService, $stateParams) => {
                    'ngInject';
                    ModalService.open('productionForm', {
                        production: ProductionDataService.get($stateParams.id),
                        facilities: FacilityDataService => FacilityDataService.all()
                    });
                }
            })
            .state('management.production.remove', {
                parent: 'production',
                url: '/:id/remove',
                onEnter: (ModalService, ProductionDataService, $stateParams) => {
                    'ngInject';
                    ModalService.open('productionForm', {
                        production: ProductionDataService.get($stateParams.id)
                    });
                }
            });
    })
    .component('productionForm', ProductionFormComponent)
    .component('productions', ProductionComponent)
    .service('ProductionDataService', ProductionDataService)
    .name;