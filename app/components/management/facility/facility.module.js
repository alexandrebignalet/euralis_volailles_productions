import angular from 'angular';
import {FacilityFormComponent} from './facility_form.component';
import {FacilityComponent} from './facility.component';
import {FacilityDataService} from './facility.service';

export const FacilityModule = angular
    .module('FacilityModule', [])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $stateProvider
            .state('facility', {
                parent: 'management',
                url: '/facilities',
                resolve: {
                    facilities: FacilityDataService => FacilityDataService.all()
                },
                views: {
                    'content@': {
                        template: '<facilities facilities="$resolve.facilities"></facilities>',
                    }
                }
            })
            .state('facility.create', {
                parent: 'facility',
                url: '/create',
                onEnter: (FacilityChargesDataService, InvestmentDataService, ModalService) => ModalService
                    .open('facilityForm', {
                        facility: {},
                        facilitiesCharges: FacilityChargesDataService => FacilityChargesDataService.all(),
                        investments: InvestmentDataService => InvestmentDataService.all()
                    })
            })
            .state('facility.edit', {
                parent: 'facility',
                url: '/:id/edit',
                onEnter: (ModalService, FacilityDataService,
                          FacilityChargesDataService, InvestmentDataService, $stateParams) => ModalService
                    .open('facilityForm', {
                        facility: FacilityChargesDataService => FacilityDataService.get($stateParams.id),
                        facilitiesCharges: FacilityChargesDataService => FacilityChargesDataService.all(),
                        investments: InvestmentDataService => InvestmentDataService.all()
                    })
            })
            .state('facility.remove', {
                parent: 'facility',
                url: '/:id/remove',
                onEnter: (ModalService, FacilityDataService, $stateParams) => ModalService.open('facilityForm', {
                        facility: FacilityDataService.get($stateParams.id)
                    })
            });
    })
    .component('facilityForm', FacilityFormComponent)
    .component('facilities', FacilityComponent)
    .service('FacilityDataService', FacilityDataService)
    .constant('FACILITIES_TYPES', ['batiment', 'cabane'])
    .name;