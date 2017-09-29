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
                    facilities: PouchDataService => PouchDataService.get(ENTITY_NAME)
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
                onEnter: (PouchDataService, ModalService) => ModalService
                    .open('facilityForm', {
                        facility: {},
                        facilitiesCharges: PouchDataService.get('facilityCharges'),
                        investments: PouchDataService.get('investment')
                    })
            })
            .state('facility.edit', {
                parent: 'facility',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService
                    .open('facilityForm', {
                        facility: (PouchDataService) => PouchDataService.get(ENTITY_NAME, $stateParams.id),
                        facilitiesCharges: (PouchDataService) => PouchDataService.get('facilityCharges'),
                        investments: (PouchDataService) => PouchDataService.get('investment')
                    })
            })
            .state('facility.remove', {
                parent: 'facility',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService.open('facilityForm', {
                        facility: PouchDataService.get(ENTITY_NAME, $stateParams.id)
                    })
            });
    })
    .component('facilityForm', FacilityFormComponent)
    .component('facilities', FacilityComponent)
    .constant('FACILITIES_TYPES', [{key: 'fixed', value:'Fixes'}, {key: 'movable', value:'Déplaçables'}])
    .name;