import angular from 'angular';
import {ProductionModule} from './production/production.module';
import {FacilityChargesModule} from './facility_charges/facility_charges.module';
import {FacilityModule} from './facility/facility.module';
import {MultiselectDirective} from '../../service/multiselect.directive';

export const ManagementModule = angular
    .module('Management', [ProductionModule, FacilityModule, FacilityChargesModule])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $stateProvider
            .state('management', {
                parent: 'components',
                abstract: true
            });
    })
    .directive('multiselect', MultiselectDirective)
    .constant('DEPARTMENTS', ['Landes', 'Pyrenees', 'HautePyrenees', 'Gers', 'HauteGaronne', 'Tarn', 'LotGaronne', 'Gironde'])
    .name;