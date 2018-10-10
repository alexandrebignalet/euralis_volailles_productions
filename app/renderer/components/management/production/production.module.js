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
                    productions: PouchDbService => PouchDbService.find(ENTITY_NAME)
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
                onEnter: (ModalService, PouchDbService, $state) => ModalService.open('productionForm', {
                    production: {},
                    facilities: PouchDbService.find('facility')
                })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            })
            .state('production.edit', {
                parent: 'production',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService
                    .open('productionForm', {
                        production: PouchDbService.find(ENTITY_NAME, $stateParams.id),
                        facilities: PouchDbService.find('facility')
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            })
            .state('production.remove', {
                parent: 'production',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService.open('productionForm', {
                        production: PouchDbService.find(ENTITY_NAME, $stateParams.id)
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            });
    })
    .component('productionForm', ProductionFormComponent)
    .component('productions', ProductionComponent)
    .name;