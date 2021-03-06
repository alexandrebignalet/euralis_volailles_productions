import angular from 'angular';
import {FacilityFormComponent} from './facility_form.component';
import {FacilityComponent} from './facility.component';

export const FacilityModule = angular
    .module('FacilityModule', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';
        const ENTITY_NAME = 'facility';

        $stateProvider
            .state('facility', {
                parent: 'management',
                url: '/facilities',
                resolve: {
                    facilities: PouchDbService => PouchDbService.find(ENTITY_NAME)
                },
                views: {
                    'content@': {
                        template: '<facilities facilities="$resolve.facilities"></facilities>',
                    }
                },
                onEnter: (SidebarService) => SidebarService.closeNav()
            })
            .state('facility.create', {
                parent: 'facility',
                url: '/create',
                onEnter: (PouchDbService, ModalService, $state) => ModalService
                    .open('facilityForm', {
                        facility: {},
                        facilitiesCharges: PouchDbService.find('facilityCharges'),
                        investments: PouchDbService.find('investment')
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            })
            .state('facility.edit', {
                parent: 'facility',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => {
                    return ModalService.open('facilityForm', {
                        facility: (PouchDbService) => PouchDbService.find(ENTITY_NAME, $stateParams.id),
                        facilitiesCharges: (PouchDbService) => PouchDbService.find('facilityCharges'),
                        investments: (PouchDbService) => PouchDbService.find('investment')
                    })
                        .then(() => $state.go('^', null, {reload: true}))
                        .catch(() => $state.go('^'))
                }
            })
            .state('facility.remove', {
                parent: 'facility',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService.open('facilityForm', {
                        facility: PouchDbService.find(ENTITY_NAME, $stateParams.id)
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            });
    })
    .component('facilityForm', FacilityFormComponent)
    .component('facilities', FacilityComponent)
    .constant('FACILITIES_TYPES', [{key: 'fixed', value:'Fixes'}, {key: 'movable', value:'Déplaçables'}])
    .name;
