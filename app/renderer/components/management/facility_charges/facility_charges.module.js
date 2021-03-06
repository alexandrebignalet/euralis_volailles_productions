import angular from 'angular';
import {FacilityChargesFormComponent} from './facility_charges_form.component';
import {FacilityChargesComponent} from './facility_charges.component';

export const FacilityChargesModule = angular
    .module('FacilityChargesModule', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        const ENTITY_NAME = 'facilityCharges';

        $stateProvider
            .state('facility_charges', {
                parent: 'management',
                url: '/facilities_charges',
                resolve: {
                    facilitiesCharges: PouchDbService => PouchDbService.find(ENTITY_NAME)
                },
                views: {
                    'content@': {
                        template: '<facilities-charges facilities-charges="$resolve.facilitiesCharges"></facilities-charges>',
                    }
                },
                onEnter: (SidebarService) => SidebarService.closeNav()
            })
            .state('facility_charges.create', {
                parent: 'facility_charges',
                url: '/create',
                onEnter: (ModalService, $state) => ModalService.open('facilityChargesForm', {
                    facilityCharges: {}
                })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            })
            .state('facility_charges.edit', {
                parent: 'facility_charges',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService
                    .open('facilityChargesForm', {
                        facilityCharges: PouchDbService.find(ENTITY_NAME, $stateParams.id)
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))

            })
            .state('facility_charges.remove', {
                parent: 'facility_charges',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDbService, $stateParams, $state) => ModalService
                    .open('facilityChargesForm', {
                        facilityCharges: PouchDbService.find(ENTITY_NAME, $stateParams.id)
                    })
                    .then(() => $state.go('^', null, {reload: true}))
                    .catch(() => $state.go('^'))
            });
    })
    .component('facilityChargesForm', FacilityChargesFormComponent)
    .component('facilitiesCharges', FacilityChargesComponent)
    .name;