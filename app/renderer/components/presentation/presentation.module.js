import angular from 'angular';
import animate from 'angular-animate';
import rzModule from 'angularjs-slider';
import 'angularjs-slider/dist/rzslider.css';
import {ImageLoaderModule} from '../image-loader/image_loader.module';

import {PresentationDataService} from './presentation_data.service';
import {PresentationComponent} from './presentation.component';
import {PrevisionnelBatimentComponent} from './previsionnel/previsionnel_batiment.component';
import {FileInputDirective} from '../../service/file_input.directive';
import {HighlighterDirective} from './highlighter.directive';
import {InvestmentsPresentationComponent} from "./previsionnel/investment/investments_presentation.component";
import {AnnuityModule} from "./previsionnel/annuity/annuity.module";

export const PresentationModule = angular.module('PresentationModule', [rzModule, ImageLoaderModule, animate, AnnuityModule])
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('presentation', {
                parent: 'components',
                url: '/presentation/:department',
                params: {
                  production: null
                },
                resolve: {
                    productions: (PresentationDataService, $stateParams) =>
                        PresentationDataService.getProdByDeptAndFacilityType($stateParams.department),
                    production: ($stateParams) => $stateParams.production
                },
                views: {
                    'content@': {
                        template: '<presentation production="$resolve.production" productions-by-facility-type="$resolve.productions"></presentation>',
                    }
                }
            });
    })
    .component('presentation', PresentationComponent)
    .service('PresentationDataService', PresentationDataService)
    .directive('fileInput', FileInputDirective)
    .directive('highlighter', HighlighterDirective)
    .component('previsionnelBatiment', PrevisionnelBatimentComponent)
    .component('investmentsPresentation', InvestmentsPresentationComponent)
    .name;
