import angular from 'angular';
import {ManagementComponent} from './management.component';
import {ProductionFormComponent} from './production/production_form.component';
import {FacilityFormComponent} from './facility/facility_form.component';
import {FacilityChargesFormComponent} from './facility_charges/facility_charges_form.component';
import {ManagementService} from './management.service';
import {FacilityDataService} from '../../service/facility.service';
import {FacilityChargesDataService} from '../../service/facility_charges.service';
import {ProductionDataService} from '../../service/production.service';
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
                    productions: ProductionDataService => ProductionDataService.all()
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
                onEnter: ManagementService => ManagementService.open('productionForm', {
                    production: {},
                    facilities: FacilityDataService => FacilityDataService.all()
                })
            })
            .state('management.edit', {
                parent: 'management',
                url: '/:id/edit',
                onEnter: (ManagementService, ProductionDataService, $stateParams) => {
                    'ngInject';
                    ManagementService.open('productionForm', {
                        production: ProductionDataService.get($stateParams.id)
                    });
                }
            })
            .state('management.remove', {
                parent: 'management',
                url: '/:id/remove',
                onEnter: (ManagementService, ProductionDataService, $stateParams) => {
                    'ngInject';
                    ManagementService.open('productionForm', {
                        production: ProductionDataService.get($stateParams.id)
                    });
                }
            })
            .state('management.createFacility', {
                parent: 'management',
                url: '/createFacility',
                onEnter: ManagementService => ManagementService.open('facilityForm', {
                    facility: {},
                    facilitiesCharges: FacilityChargesDataService => FacilityChargesDataService.all()
                })
            })
            .state('management.createFacilityCharges', {
                parent: 'management',
                url: '/createFacilityCharges',
                onEnter: ManagementService => ManagementService.open('facilityChargesForm', {})
            });
    })
    .component('management', ManagementComponent)
    .component('productionForm', ProductionFormComponent)
    .component('facilityForm', FacilityFormComponent)
    .component('facilityChargesForm', FacilityChargesFormComponent)
    .service('ManagementService', ManagementService)
    .service('FacilityDataService', FacilityDataService)
    .service('FacilityChargesDataService', FacilityChargesDataService)
    .service('ProductionDataService', ProductionDataService)
    .constant('FACILITIES_TYPES', ['batiment', 'cabane'])
    .name;