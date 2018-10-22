import angular from 'angular';
import {ProductionModule} from './production/production.module';
import {FacilityChargesModule} from './facility_charges/facility_charges.module';
import {FacilityModule} from './facility/facility.module';
import {VideoModule} from './video/video.module';
import {ProspectModule} from './prospect/prospect.module';
import {MultiselectDirective} from '../../service/multiselect.directive';
import {CustomOnChangeDirective} from '../../service/on-change.directive';
import {ToastrService} from './toastr.service';

const departmentNames = [];
departmentNames.push({key: 'Landes', value:'Landes'});
departmentNames.push({key: 'Pyrenees', value:'Pyrénées'});
departmentNames.push({key: 'HautePyrenees', value:'Hautes-Pyrénées'});
departmentNames.push({key: 'Gers', value:'Gers'});
departmentNames.push({key: 'HauteGaronne', value:'Haute-Garonne'});
departmentNames.push({key: 'Tarn', value:'Tarn'});
departmentNames.push({key: 'LotGaronne', value:'Lot-Et-Garonne'});
departmentNames.push({key: 'Gironde', value:'Gironde'});


export const ManagementModule = angular
    .module('Management', [ProductionModule, FacilityModule, FacilityChargesModule, VideoModule, ProspectModule])
    .config(($locationProvider, $stateProvider, $compileProvider) => {
        'ngInject';

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/);

        $stateProvider
            .state('management', {
                parent: 'components',
                abstract: true
            });
    })
    .directive('multiselect', MultiselectDirective)
    .directive('customOnChange', CustomOnChangeDirective)
    .service('ToastrService', ToastrService)
    .constant('DEPARTMENTS', departmentNames)
    .name;