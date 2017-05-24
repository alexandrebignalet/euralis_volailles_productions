import angular from 'angular';
import {ManagementComponent} from './management.component';
import {FacilityFormComponent} from './facility/facility_form.component';
import {FacilityChargesFormComponent} from './facility_charges/facility_charges_form.component';
import {ManagementService} from './management.service';
import {FacilityDataService} from '../../service/facility.service';
import {FacilityChargesDataService} from '../../service/facility_charges.service';
import {ProductionModule} from './production/production.module';
import './management.scss';

export const ManagementModule = angular
    .module('Management', [ProductionModule])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $stateProvider
            .state('management', {
                parent: 'components',
                url: '/management',
                views: {
                    'content@': {
                        template: '<management></management>',
                    }
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
    .component('facilityForm', FacilityFormComponent)
    .component('facilityChargesForm', FacilityChargesFormComponent)
    .service('ManagementService', ManagementService)
    .service('FacilityDataService', FacilityDataService)
    .service('FacilityChargesDataService', FacilityChargesDataService)
    .constant('FACILITIES_TYPES', ['batiment', 'cabane'])
    .name;