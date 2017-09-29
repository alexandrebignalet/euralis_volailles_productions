import angular from 'angular';
import {ProductionFormComponent} from './production_form.component';
import {ProductionComponent} from './production.component';
import './production.scss';

export const ProductionModule = angular
    .module('Production', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        const ENTITY_NAME = 'production';

        $stateProvider
            .state('production', {
                parent: 'management',
                url: '/productions',
                resolve: {
                    productions: PouchDataService => PouchDataService.get(ENTITY_NAME)
                },
                views: {
                    'content@': {
                        template: '<productions productions="$resolve.productions"></productions>',
                    }
                },
                onEnter: (SidebarService) => SidebarService.closeNav()
            })
            .state('production.create', {
                parent: 'production',
                url: '/create',
                onEnter: (ModalService, PouchDataService) => ModalService.open('productionForm', {
                    production: {},
                    facilities: PouchDataService.get('facility')
                })
            })
            .state('production.edit', {
                parent: 'production',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService
                    .open('productionForm', {
                        production: PouchDataService.get(ENTITY_NAME, $stateParams.id),
                        facilities: PouchDataService.get('facility')
                    })
            })
            .state('production.remove', {
                parent: 'production',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService.open('productionForm', {
                        production: PouchDataService.get(ENTITY_NAME, $stateParams.id)
                    })
            });
    })
    .component('productionForm', ProductionFormComponent)
    .component('productions', ProductionComponent)
    .name;