import angular from 'angular';
import {FacilityChargesFormComponent} from './facility_charges_form.component';
import {FacilityChargesComponent} from './facility_charges.component';
import {FacilityChargesDataService} from './facility_charges.service';

export const FacilityChargesModule = angular
    .module('FacilityCharges', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $stateProvider
            .state('facility_charges', {
                parent: 'management',
                url: '/facilities_charges',
                resolve: {
                    facilitiesCharges: FacilityChargesDataService => FacilityChargesDataService.all()
                },
                views: {
                    'content@': {
                        template: '<facilities-charges facilities-charges="$resolve.facilitiesCharges"></facilities-charges>',
                    }
                }
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
                onEnter: (ModalService, FacilityChargesDataService, $stateParams) => {
                    'ngInject';
                    ModalService.open('facilityChargesForm', {
                        facilityCharges: FacilityChargesDataService.get($stateParams.id)
                    });
                }
            })
            .state('facility_charges.remove', {
                parent: 'facility_charges',
                url: '/:id/remove',
                onEnter: (ModalService, FacilityDataService, $stateParams) => {
                    'ngInject';
                    ModalService.open('facilityChargesForm', {
                        facilityCharges: FacilityChargesDataService.get($stateParams.id)
                    });
                }
            });
    })
    .component('facilityChargesForm', FacilityChargesFormComponent)
    .component('facilitiesCharges', FacilityChargesComponent)
    .service('FacilityChargesDataService', FacilityChargesDataService)
    .name;