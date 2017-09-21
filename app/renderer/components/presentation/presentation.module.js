import angular from 'angular';
import animate from 'angular-animate';
import rzModule from 'angularjs-slider';
import 'angularjs-slider/dist/rzslider.css';
import {ImageLoaderModule} from '../image-loader/image_loader.module';

import {PresentationDataService} from './presentation_data.service';
import {PresentationComponent} from './presentation.component';
import {PrevisionnelBatimentComponent} from './previsionnel_batiment.component';
import {FileInputDirective} from '../../service/file_input.directive';
import {HighlighterDirective} from './highlighter.directive';

export const PresentationModule = angular.module('PresentationModule', [rzModule, ImageLoaderModule, animate])
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('presentation', {
                parent: 'components',
                url: '/presentation/:department',
                resolve: {
                    productions: (FACILITIES_TYPES, PresentationDataService, $stateParams, $q) => {
                        const deferred = $q.defer();

                        let promises = [];
                        FACILITIES_TYPES.forEach((facilityType) => {
                            promises.push(PresentationDataService.getProduction($stateParams.department, facilityType));
                        });

                        Promise
                            .all(promises)
                            .then((productions) => {
                                deferred.resolve(productions);
                            });

                        return deferred.promise;
                    }
                },
                views: {
                    'content@': {
                        template: '<presentation productions="$resolve.productions"></presentation>',
                    }
                }
            });
    })
    .component('presentation', PresentationComponent)
    .service('PresentationDataService', PresentationDataService)
    .directive('fileInput', FileInputDirective)
    .directive('highlighter', HighlighterDirective)
    .component('previsionnelBatiment', PrevisionnelBatimentComponent)
    .name;