import angular from 'angular';
import {FacilityChargesFormComponent} from './facility_charges_form.component';
import {FacilityChargesComponent} from './facility_charges.component';
import {PouchDataService} from './facility_charges.service';

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
                    facilitiesCharges: PouchDataService => PouchDataService.get(ENTITY_NAME)
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
                onEnter: ModalService => ModalService.open('facilityChargesForm', {
                    facilityCharges: {}
                })
            })
            .state('facility_charges.edit', {
                parent: 'facility_charges',
                url: '/:id/edit',
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService
                    .open('facilityChargesForm', {
                        facilityCharges: PouchDataService.get(ENTITY_NAME, $stateParams.id)
                    })
            })
            .state('facility_charges.remove', {
                parent: 'facility_charges',
                url: '/:id/remove',
                onEnter: (ModalService, PouchDataService, $stateParams) => ModalService
                    .open('facilityChargesForm', {
                        facilityCharges: PouchDataService.get(ENTITY_NAME, $stateParams.id)
                    })
            });
    })
    .component('facilityChargesForm', FacilityChargesFormComponent)
    .component('facilitiesCharges', FacilityChargesComponent)
    .name;