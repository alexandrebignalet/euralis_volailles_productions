import angular from 'angular';
import {RotationComponent} from './rotation.component';
import {facility} from './facility.filter';

export const RotationModule = angular.module('RotationModule', [])
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('rotation', {
                parent: 'components',
                url: '/rotation',
                resolve: {
                    productions: (ProductionDataService) => ProductionDataService.all()
                },
                views: {
                    'content@': {
                        template: '<rotation productions="$resolve.productions"></rotation>',
                    }
                }
            });
    })
    .component('rotation', RotationComponent)
    .filter('facility', facility)
    .name;