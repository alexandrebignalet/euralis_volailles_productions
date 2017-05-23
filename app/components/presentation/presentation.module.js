import angular from 'angular';
import rzModule from 'angularjs-slider';
import 'angularjs-slider/dist/rzslider.css';

import {PresentationDataService} from './presentation_data.service';
import {PresentationComponent} from './presentation.component';
import {PrevisionnelBatimentComponent} from './previsionnel_batiment.component';

export const PresentationModule = angular.module('PresentationModule', [rzModule])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });


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
    .component('previsionnelBatiment', PrevisionnelBatimentComponent)
    .name;